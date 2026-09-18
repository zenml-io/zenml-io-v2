import { spawnSync } from 'node:child_process';
import { mkdtempSync, rmSync, statSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
const input = process.argv[2] ?? 'out/ZenML_Teratec2026_Institutional_EN_v15.mp4';
const output = process.argv[3] ?? 'out/ZenML_Labs_v15_Discord.mp4';
const temp = mkdtempSync(join(tmpdir(), 'zenml-discord-'));
try {
  for (const pass of [1, 2]) {
    const args = ['-y', '-i', input, '-an', '-vf', 'scale=1280:720:flags=lanczos', '-c:v', 'libx264', '-preset', 'slow', '-b:v', '475k', '-pix_fmt', 'yuv420p', '-pass', String(pass), '-passlogfile', join(temp, 'encode')];
    args.push(...(pass === 1 ? ['-f', 'null', '/dev/null'] : ['-movflags', '+faststart', output]));
    const result = spawnSync('ffmpeg', args, { stdio: 'inherit' });
    if (result.error) throw result.error;
    if (result.status !== 0) throw new Error(`Compression pass ${pass} failed`);
  }
  const bytes = statSync(output).size;
  if (bytes >= 10_000_000) throw new Error(`Share export exceeds 10 MB: ${bytes}`);
  console.log(`Discord copy: ${(bytes / 1e6).toFixed(2)} MB · ${output}`);
} finally {
  rmSync(temp, { recursive: true, force: true });
}
