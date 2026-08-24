param(
  [Parameter(Mandatory = $true)][string]$TextFile,
  [Parameter(Mandatory = $true)][string]$OutputFile
)

$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Speech
$voice = [System.Speech.Synthesis.SpeechSynthesizer]::new()
try {
  $voice.SelectVoice('Microsoft Zira Desktop')
  $voice.Rate = -1
  $voice.Volume = 100
  $voice.SetOutputToWaveFile($OutputFile)
  $voice.Speak((Get-Content -LiteralPath $TextFile -Raw))
} finally {
  $voice.Dispose()
}
