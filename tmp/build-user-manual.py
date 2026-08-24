from pathlib import Path
import subprocess
import wave

from PIL import Image, ImageDraw, ImageFont, ImageOps
import imageio_ffmpeg


ROOT = Path(r"D:\04_PinTechHasan\01_Projects\ProjectsIdea\SMARTPORTFOLIO")
SCREENSHOTS = ROOT / "release" / "codester-assets" / "screenshots"
WORK = ROOT / "tmp" / "user-manual-video"
OUTPUT = ROOT / "release" / "codester-assets" / "SmartPortfolio-v1.0.0-User-Manual.mp4"
SPEAK_SCRIPT = ROOT / "tmp" / "speak-manual.ps1"
FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()

CHAPTERS = [
    (
        "01-homepage.png",
        "SmartPortfolio v1.0.0",
        "Complete Portfolio CMS and Admin Panel",
        "Welcome to the SmartPortfolio user manual. This video shows how to review the public portfolio and manage its content from the secure administration panel.",
    ),
    (
        "01-homepage.png",
        "1. Public Homepage",
        "Present your profile, role and primary calls to action",
        "The public homepage introduces the portfolio owner, professional role, location, and primary actions. Visitors can start a conversation or open the published insights.",
    ),
    (
        "02-about.png",
        "2. About Section",
        "Explain experience, focus, location and contact details",
        "The about section presents a concise professional summary. Profile details, location, focus, and contact information are managed from the administration workspace.",
    ),
    (
        "03-projects.png",
        "3. Selected Projects",
        "Showcase important work, programs and measurable outcomes",
        "The selected work section highlights important projects and programs. Each item can include a client, title, summary, status, display order, and supporting images.",
    ),
    (
        "04-blog.png",
        "4. Public Blog",
        "Publish searchable insights and professional articles",
        "The public blog lists published articles and provides search. Visitors can open individual posts while drafts and archived content remain hidden.",
    ),
    (
        "05-admin-dashboard.png",
        "5. Admin Dashboard",
        "Open your domain slash admin and sign in securely",
        "To manage the portfolio, open your domain followed by slash admin and sign in. The dashboard summarizes projects, posts, messages, media, recent activity, and common actions.",
    ),
    (
        "06-project-management.png",
        "6. Project Management",
        "Create, edit, publish and arrange portfolio projects",
        "Choose Projects from the sidebar. Use Add new to create a project, or the row actions to edit existing content. Status and order control public visibility and presentation.",
    ),
    (
        "07-blog-management.png",
        "7. Blog Management",
        "Manage drafts, published posts, categories and tags",
        "Choose Posts to manage the blog. Create a new post, edit existing articles, and select draft, published, or archived status. Categories and tags help organize content.",
    ),
    (
        "08-theme-settings.png",
        "8. Theme Builder",
        "Customize presets, colors, fonts and light or dark mode",
        "The Theme Builder controls the visual system without source-code changes. Select a preset, refine colors and fonts, choose the default display mode, then save and preview the public site.",
    ),
    (
        "09-page-settings.png",
        "9. Custom Pages",
        "Add reusable pages without changing application code",
        "Choose Pages to create additional public content. Add a page title, slug, body, status, and navigation settings. Published pages become available to portfolio visitors.",
    ),
    (
        "05-admin-dashboard.png",
        "SmartPortfolio Ready",
        "Manage content, design and publishing from one workspace",
        "SmartPortfolio combines a responsive public portfolio with a secure content workspace. Refer to the included documentation for installation, database setup, deployment, and complete administration guidance.",
    ),
]


def font(name: str, size: int):
    return ImageFont.truetype(str(Path(r"C:\Windows\Fonts") / name), size)


def fit_text(draw, text, font_obj, max_width):
    words = text.split()
    lines, current = [], ""
    for word in words:
        candidate = f"{current} {word}".strip()
        if draw.textbbox((0, 0), candidate, font=font_obj)[2] <= max_width:
            current = candidate
        else:
            if current:
                lines.append(current)
            current = word
    if current:
        lines.append(current)
    return lines


def make_slide(source: Path, title: str, caption: str, output: Path):
    canvas = Image.new("RGB", (1920, 1080), "#0F172A")
    shot = Image.open(source).convert("RGB")
    shot = ImageOps.fit(shot, (1728, 972), method=Image.Resampling.LANCZOS, centering=(0.5, 0.45))
    canvas.paste(shot, (96, 54))
    overlay = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
    od = ImageDraw.Draw(overlay)
    od.rectangle((0, 0, 1920, 132), fill=(15, 23, 42, 235))
    od.rectangle((0, 888, 1920, 1080), fill=(15, 23, 42, 242))
    od.rectangle((92, 126, 360, 133), fill=(29, 78, 216, 255))
    canvas = Image.alpha_composite(canvas.convert("RGBA"), overlay)
    draw = ImageDraw.Draw(canvas)
    draw.text((96, 35), title, font=font("segoeuib.ttf", 54), fill="#FFFFFF")
    draw.text((96, 929), caption, font=font("segoeui.ttf", 38), fill="#E2E8F0")
    draw.text((96, 1008), "SMARTPORTFOLIO  •  USER MANUAL", font=font("segoeuib.ttf", 20), fill="#5EEAD4")
    canvas.convert("RGB").save(output, "PNG", optimize=True)


WORK.mkdir(parents=True, exist_ok=True)
segments = []

for index, (image_name, title, caption, narration) in enumerate(CHAPTERS, start=1):
    stem = f"chapter-{index:02d}"
    slide = WORK / f"{stem}.png"
    text_file = WORK / f"{stem}.txt"
    audio = WORK / f"{stem}.wav"
    segment = WORK / f"{stem}.mp4"
    make_slide(SCREENSHOTS / image_name, title, caption, slide)
    text_file.write_text(narration, encoding="utf-8")
    subprocess.run(
        [
            "powershell",
            "-NoProfile",
            "-ExecutionPolicy",
            "Bypass",
            "-File",
            str(SPEAK_SCRIPT),
            "-TextFile",
            str(text_file),
            "-OutputFile",
            str(audio),
        ],
        check=True,
    )
    with wave.open(str(audio), "rb") as wav:
        duration = wav.getnframes() / wav.getframerate() + 1.0
    fade_out = max(0.5, duration - 0.4)
    subprocess.run(
        [
            FFMPEG,
            "-y",
            "-loop",
            "1",
            "-framerate",
            "30",
            "-i",
            str(slide),
            "-i",
            str(audio),
            "-vf",
            f"fade=t=in:st=0:d=0.35,fade=t=out:st={fade_out:.3f}:d=0.35,format=yuv420p",
            "-af",
            "apad=pad_dur=1",
            "-shortest",
            "-c:v",
            "libx264",
            "-preset",
            "medium",
            "-crf",
            "20",
            "-c:a",
            "aac",
            "-b:a",
            "160k",
            "-ar",
            "48000",
            "-movflags",
            "+faststart",
            str(segment),
        ],
        check=True,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )
    segments.append(segment)

concat_file = WORK / "segments.txt"
concat_file.write_text("\n".join(f"file '{item.as_posix()}'" for item in segments), encoding="utf-8")
subprocess.run(
    [
        FFMPEG,
        "-y",
        "-f",
        "concat",
        "-safe",
        "0",
        "-i",
        str(concat_file),
        "-c",
        "copy",
        "-metadata",
        "title=SmartPortfolio v1.0.0 User Manual",
        "-movflags",
        "+faststart",
        str(OUTPUT),
    ],
    check=True,
    stdout=subprocess.DEVNULL,
    stderr=subprocess.DEVNULL,
)

print(OUTPUT)
