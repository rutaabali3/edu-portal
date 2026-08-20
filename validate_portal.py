from pathlib import Path
from html.parser import HTMLParser
import subprocess

ROOT = Path(__file__).parent
portals = ["codequest", "algoforge", "codecrafter", "datalearn", "designhub", "ecolearn", "langlab", "langquest", "mathminds", "skillspark", "studyforge", "translingua"]

class RefParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.refs = []
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        for key in ("href", "src"):
            value = attrs.get(key)
            if value and not value.startswith(("http://", "https://", "#", "mailto:", "javascript:", "data:")):
                self.refs.append(value.split("#", 1)[0].split("?", 1)[0])

errors = []
for portal in portals:
    page = ROOT / portal / "index.html"
    if not page.exists():
        errors.append(f"missing page: {portal}/index.html")
        continue
    parser = RefParser()
    try:
        parser.feed(page.read_text(encoding="utf-8"))
    except Exception as exc:
        errors.append(f"HTML parse failed {portal}: {exc}")
    for ref in parser.refs:
        target = (page.parent / ref).resolve()
        if not target.exists():
            errors.append(f"missing local reference: {portal}/index.html -> {ref}")
    script = ROOT / portal / "javascript" / f"{portal}.js"
    css = ROOT / portal / "css" / f"{portal}.css"
    if not script.exists(): errors.append(f"missing script: {script.relative_to(ROOT)}")
    if not css.exists(): errors.append(f"missing stylesheet: {css.relative_to(ROOT)}")
    if script.exists():
        result = subprocess.run(["node", "--check", str(script)], capture_output=True, text=True)
        if result.returncode: errors.append(f"JS syntax failed {portal}: {result.stderr.strip()}")

notes = ROOT / "research-notes.md"
if not notes.exists(): errors.append("missing research-notes.md")
else:
    note_text = notes.read_text(encoding="utf-8")
    for label in ("CodeQuest", "AlgoForge", "CodeCrafter", "DataLearn", "DesignHub", "EcoLearn", "LangLab", "LangQuest", "MathMinds", "SkillSpark", "StudyForge", "TransLingua"):
        if f"## {label}" not in note_text:
            errors.append(f"missing research notes section: {label}")

print(f"Validated {len(portals)} sub-portals")
print(f"Research notes: {'present' if notes.exists() else 'missing'}")
if errors:
    print("VALIDATION ERRORS")
    print("\n".join(errors))
    raise SystemExit(1)
print("VALIDATION OK")
