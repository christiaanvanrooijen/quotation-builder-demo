import streamlit as st
import streamlit.components.v1 as components
import base64
import os
import re
from pathlib import Path

st.set_page_config(
    page_title="PFM Retail Potential Scan",
    page_icon="📍",
    layout="wide",
    initial_sidebar_state="collapsed"
)

base_dir = Path(__file__).parent
html = (base_dir / "index.html").read_text(encoding="utf-8")
pricing_config = (base_dir / "pricing-config.js").read_text(encoding="utf-8")
mapping_environment = os.environ.get("PFM_ODOO_MAPPING_ENV", "production").lower()
if mapping_environment not in {"production", "test"}:
    st.error("PFM_ODOO_MAPPING_ENV must be 'production' or 'test'.")
    st.stop()

if mapping_environment == "test":
    environment_line = '    const ODOO_MAPPING_ENV = window.PFM_ODOO_MAPPING_ENV === "test" ? "test" : "production";'
    html = html.replace(
        environment_line,
        '    window.PFM_ODOO_MAPPING_ENV = "test";\n' + environment_line,
        1,
    )
    st.warning("TEST MODE: uses test Odoo mappings and the configured webhook-test endpoint. Confirm n8n is listening before submitting.")
else:
    st.warning("PRODUCTION MODE: quote submissions go to the live n8n/Odoo route and may create real records. Review all details before submitting.")

# Streamlit components.html renders the HTML in an iframe and does not reliably
# serve sibling JS files. Keep index.html browser-friendly with a script src,
# but inline pricing-config.js at runtime inside Streamlit.
html = re.sub(
    r'<script src="pricing-config\.js(?:\?[^\"]*)?"></script>',
    lambda _: "<script>\n" + pricing_config + "\n</script>",
    html,
    count=1,
)

# components.html runs in an iframe, so relative icon URLs are not served from
# the repository. Embed the small approved SVG assets for the Streamlit view.
for icon_path in (base_dir / "assets" / "icons").glob("*.svg"):
    icon_data = base64.b64encode(icon_path.read_bytes()).decode("ascii")
    html = html.replace(
        f"assets/icons/{icon_path.name}",
        f"data:image/svg+xml;base64,{icon_data}",
    )

components.html(html, height=5200, scrolling=False)
