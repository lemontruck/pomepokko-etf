"""
미리보기용 단일 HTML(dist-single/index.html)에만 Pretendard 서브셋을 data URI 로 넣습니다.
(미리보기 호스팅 환경은 jsDelivr 폰트 CSS 를 막기 때문에, 실제 화면과 같은 글꼴로 검수하기 위함)
Vercel 배포본(dist/)은 기존대로 jsDelivr 의 Pretendard 를 사용합니다.

필요: pip install fonttools brotli / npm pack pretendard@1.3.9 (압축 해제 경로를 FONT 에 지정)
사용: python scripts/preview_embed_font.py <PretendardVariable.woff2 경로>
"""
import base64, subprocess, sys, tempfile, pathlib

html_path = pathlib.Path(__file__).resolve().parent.parent / 'dist-single' / 'index.html'
font_src = sys.argv[1]
html = html_path.read_text(encoding='utf-8')
chars = set(ch for ch in html if ord(ch) > 127) | set(chr(c) for c in range(32, 127))
with tempfile.TemporaryDirectory() as d:
    txt = pathlib.Path(d, 'chars.txt'); txt.write_text(''.join(sorted(chars)), encoding='utf-8')
    out = pathlib.Path(d, 'sub.woff2')
    subprocess.run(['pyftsubset', font_src, f'--text-file={txt}', '--flavor=woff2', "--layout-features=*", f'--output-file={out}'], check=True)
    b64 = base64.b64encode(out.read_bytes()).decode()
style = ("<style>@font-face{font-family:'Pretendard Variable';font-weight:45 920;font-style:normal;font-display:swap;"
         f"src:url(data:font/woff2;base64,{b64}) format('woff2')}}</style>")
if 'Pretendard Variable\';font-weight:45 920' not in html:
    html = html.replace('</head>', style + '</head>', 1)
    html_path.write_text(html, encoding='utf-8')
print('embedded', len(b64) // 1024, 'KB (base64)')
