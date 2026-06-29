param(
    [ValidateSet("auto", "codex", "claude", "agents", "all")]
    [string]$Agent = "auto",
    [string[]]$Target = @(),
    [string]$Source = "",
    [string]$Ref = $(if ($env:REPO_DOCS_REF) { $env:REPO_DOCS_REF } else { "main" }),
    [switch]$Uninstall
)

$ErrorActionPreference = "Stop"
$RepoSlug = "YurunChen/repo-docs-skills"

function Expand-SkillPath([string]$Path) {
    if ($Path -eq "~") { return $HOME }
    if ($Path.StartsWith("~/") -or $Path.StartsWith("~\")) {
        return Join-Path $HOME $Path.Substring(2)
    }
    return $Path
}

function Codex-Target {
    $root = if ($env:CODEX_HOME) { $env:CODEX_HOME } else { Join-Path $HOME ".codex" }
    return Join-Path (Expand-SkillPath $root) "skills"
}

function Claude-Target {
    $root = if ($env:CLAUDE_HOME) { $env:CLAUDE_HOME } else { Join-Path $HOME ".claude" }
    return Join-Path (Expand-SkillPath $root) "skills"
}

function Agents-Target {
    $root = if ($env:AGENTS_HOME) { $env:AGENTS_HOME } else { Join-Path $HOME ".agents" }
    return Join-Path (Expand-SkillPath $root) "skills"
}

function Add-Target([System.Collections.Generic.List[string]]$Targets, [string]$Path) {
    $expanded = Expand-SkillPath $Path
    if (-not $Targets.Contains($expanded)) {
        [void]$Targets.Add($expanded)
    }
}

function Resolve-Targets {
    $targets = [System.Collections.Generic.List[string]]::new()
    foreach ($item in $Target) {
        Add-Target $targets $item
    }
    if ($targets.Count -gt 0) { return $targets }

    switch ($Agent) {
        "codex" { Add-Target $targets (Codex-Target) }
        "claude" { Add-Target $targets (Claude-Target) }
        "agents" { Add-Target $targets (Agents-Target) }
        "all" {
            Add-Target $targets (Codex-Target)
            Add-Target $targets (Claude-Target)
            Add-Target $targets (Agents-Target)
        }
        "auto" {
            if ($env:CODEX_HOME -or (Test-Path (Join-Path $HOME ".codex"))) { Add-Target $targets (Codex-Target) }
            if ($env:CLAUDE_HOME -or (Test-Path (Join-Path $HOME ".claude"))) { Add-Target $targets (Claude-Target) }
            if ($env:AGENTS_HOME -or (Test-Path (Join-Path $HOME ".agents"))) { Add-Target $targets (Agents-Target) }
            if ($targets.Count -eq 0) { Add-Target $targets (Codex-Target) }
        }
    }
    return $targets
}

function Require-SourceFile([string]$Root, [string]$Relative) {
    $path = Join-Path $Root $Relative
    if (-not (Test-Path $path)) {
        throw "Missing required source file: $path"
    }
}

function Resolve-SourceLayout([string]$Root) {
    $repoSkill = Join-Path $Root "skills/repo-docs"
    $repoSkillZh = Join-Path $Root "skills/repo-docs-zh"
    if ((Test-Path (Join-Path $repoSkill "SKILL.md")) -and (Test-Path (Join-Path $repoSkill "PAGE_RULES.md"))) {
        return @{
            Skill = $repoSkill
            Zh = $repoSkillZh
        }
    }

    if ((Test-Path (Join-Path $Root "SKILL.md")) -and (Test-Path (Join-Path $Root "PAGE_RULES.md"))) {
        $siblingZh = Join-Path (Split-Path $Root -Parent) "repo-docs-zh"
        $nestedZh = Join-Path $Root "repo-docs-zh"
        $zh = ""
        if (Test-Path (Join-Path $siblingZh "SKILL.md")) {
            $zh = $siblingZh
        } elseif (Test-Path (Join-Path $nestedZh "SKILL.md")) {
            $zh = $nestedZh
        }
        if ($zh) {
            return @{
                Skill = $Root
                Zh = $zh
            }
        }
    }

    throw "Could not find repo-docs skill files under $Root. Expected either skills/repo-docs/ or a direct repo-docs skill directory."
}

function Prepare-Source {
    if ($Source) {
        $root = (Resolve-Path $Source).Path
    } elseif ($PSScriptRoot -and ((Test-Path (Join-Path $PSScriptRoot "skills/repo-docs/SKILL.md")) -or (Test-Path (Join-Path $PSScriptRoot "SKILL.md")))) {
        $root = $PSScriptRoot
    } elseif ((Test-Path "skills/repo-docs/SKILL.md") -or (Test-Path "SKILL.md")) {
        $root = (Get-Location).Path
    } else {
        $tmp = Join-Path ([System.IO.Path]::GetTempPath()) ("repo-docs-skills-" + [System.Guid]::NewGuid().ToString("N"))
        New-Item -ItemType Directory -Path $tmp | Out-Null
        $zip = Join-Path $tmp "repo-docs.zip"
        Write-Host "Downloading $RepoSlug@$Ref..."
        Invoke-WebRequest -Uri "https://codeload.github.com/$RepoSlug/zip/$Ref" -OutFile $zip
        Expand-Archive -Path $zip -DestinationPath $tmp
        $root = (Get-ChildItem -Path $tmp -Directory -Filter "repo-docs-skills-*").FullName | Select-Object -First 1
    }

    $layout = Resolve-SourceLayout $root
    $skillRoot = $layout.Skill
    $zhRoot = $layout.Zh
    foreach ($file in @(
        "SKILL.md",
        "REFERENCE.md",
        "WRITING.md",
        "PAGE_RULES.md",
        "SCOPE_MODES.md",
        "SYNC_RULES.md",
        "QUALITY_RULES.md",
        "EXAMPLES.md",
        "validate_repo_docs.py",
        "scripts/validate_repo_docs.py"
    )) {
        Require-SourceFile $skillRoot $file
    }
    Require-SourceFile $zhRoot "SKILL.md"
    return @{
        Skill = $skillRoot
        Zh = $zhRoot
    }
}

function Install-ToTarget([string]$SkillsDir, [hashtable]$SourceLayout) {
    $repoDocs = Join-Path $SkillsDir "repo-docs"
    $repoDocsZh = Join-Path $SkillsDir "repo-docs-zh"
    $sourceRoot = $SourceLayout.Skill
    $sourceZhRoot = $SourceLayout.Zh
    New-Item -ItemType Directory -Force -Path (Join-Path $repoDocs "scripts") | Out-Null
    New-Item -ItemType Directory -Force -Path $repoDocsZh | Out-Null

    foreach ($file in @(
        "SKILL.md",
        "REFERENCE.md",
        "WRITING.md",
        "PAGE_RULES.md",
        "SCOPE_MODES.md",
        "SYNC_RULES.md",
        "QUALITY_RULES.md",
        "EXAMPLES.md",
            "validate_repo_docs.py"
    )) {
        Copy-Item -Force (Join-Path $sourceRoot $file) (Join-Path $repoDocs $file)
    }
    Copy-Item -Force (Join-Path $sourceRoot "scripts/validate_repo_docs.py") (Join-Path $repoDocs "scripts/validate_repo_docs.py")
    Copy-Item -Force (Join-Path $sourceZhRoot "SKILL.md") (Join-Path $repoDocsZh "SKILL.md")

    if (-not (Test-Path (Join-Path $repoDocs "SKILL.md"))) { throw "Install failed: $repoDocs/SKILL.md missing" }
    if (-not (Test-Path (Join-Path $repoDocsZh "SKILL.md"))) { throw "Install failed: $repoDocsZh/SKILL.md missing" }
    Write-Host "Installed repo-docs skills into $SkillsDir"
}

function Uninstall-FromTarget([string]$SkillsDir) {
    Remove-Item -Recurse -Force -ErrorAction SilentlyContinue (Join-Path $SkillsDir "repo-docs")
    Remove-Item -Recurse -Force -ErrorAction SilentlyContinue (Join-Path $SkillsDir "repo-docs-zh")
    Write-Host "Removed repo-docs skills from $SkillsDir"
}

$targets = Resolve-Targets
$sourceRoot = $null
if (-not $Uninstall) {
    $sourceRoot = Prepare-Source
}

foreach ($targetDir in $targets) {
    if ($Uninstall) {
        Uninstall-FromTarget $targetDir
    } else {
        Install-ToTarget $targetDir $sourceRoot
    }
}
