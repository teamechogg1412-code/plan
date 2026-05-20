# -*- coding: utf-8 -*-
import pathlib
p = pathlib.Path(__file__).parent / "build_form.py"
text = p.read_text(encoding="utf-8")
start = text.find('html = html.replace("MOTION_OPEN"')
end = text.find("out.write_text", start)
tag = "div"
replacement = (
    'old_tag = "motion"\n'
    f'html = html.replace("<" + old_tag, "<{tag}").replace("</" + old_tag + ">", "</{tag}>")\n\n'
)
text = text[:start] + replacement + text[end:]
p.write_text(text, encoding="utf-8")
print("fixed")
