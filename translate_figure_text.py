import os

from PIL import Image, ImageDraw, ImageFont


def get_font(size: int) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    """Return a Chinese‑capable font if possible, otherwise default."""
    candidates = [
        r"C:\Windows\Fonts\msyh.ttc",  # Microsoft YaHei
        r"C:\Windows\Fonts\msyh.ttf",
        r"C:\Windows\Fonts\simhei.ttf",  # SimHei
    ]
    for path in candidates:
        if os.path.exists(path):
            try:
                return ImageFont.truetype(path, size)
            except Exception:
                continue
    return ImageFont.load_default()


def get_text_size(font: ImageFont.ImageFont, text: str) -> tuple[int, int]:
    """Return text width and height using font's bounding box API."""
    bbox = font.getbbox(text)
    return bbox[2] - bbox[0], bbox[3] - bbox[1]


def draw_vertical_text(base: Image.Image, text: str, font: ImageFont.ImageFont, center_xy: tuple[float, float], fill=(0, 0, 0)) -> None:
    """Draw vertical text (rotated 90°) onto base image, centered at center_xy."""
    w, h = get_text_size(font, text)
    pad = 10
    txt_img = Image.new("RGBA", (w + 2 * pad, h + 2 * pad), (255, 255, 255, 0))
    txt_draw = ImageDraw.Draw(txt_img)
    txt_draw.text((pad, pad), text, font=font, fill=fill)

    rotated = txt_img.rotate(90, expand=True)
    rx, ry = rotated.size
    x = int(center_xy[0] - rx / 2)
    y = int(center_xy[1] - ry / 2)
    base.paste(rotated, (x, y), rotated)


def main() -> None:
    src_path = r"C:\Users\admin\.cursor\projects\c-Users-admin-lab-site\assets\c__Users_admin_AppData_Roaming_Cursor_User_workspaceStorage_364ce5af24142f6d1d1711d4f04e5851_images_7-0b161983-3f37-48c5-88d3-7b9c7f23011e.png"

    # Resolve desktop path for current user
    desktop_dir = os.path.join(os.path.expanduser("~"), "Desktop")
    os.makedirs(desktop_dir, exist_ok=True)
    out_path = os.path.join(desktop_dir, "figure_b_ct_value_cn.png")

    img = Image.open(src_path).convert("RGBA")
    width, height = img.size
    draw = ImageDraw.Draw(img)

    # Font sizes relative to image height
    legend_font = get_font(int(height * 0.035))
    axis_font = get_font(int(height * 0.04))
    eq_font = get_font(int(height * 0.032))

    # 1) Redraw legend area with Chinese text
    legend_box = [
        int(width * 0.22),
        int(height * 0.03),
        int(width * 0.86),
        int(height * 0.16),
    ]
    draw.rectangle(legend_box, fill=(255, 255, 255))

    # CT value legend (rectangle + text)
    rect_x1 = legend_box[0] + int(width * 0.015)
    rect_y1 = legend_box[1] + int(height * 0.03)
    rect_x2 = rect_x1 + int(width * 0.055)
    rect_y2 = rect_y1 + int(height * 0.055)
    draw.rectangle([rect_x1, rect_y1, rect_x2, rect_y2], fill=(173, 205, 255), outline=(0, 0, 0))
    draw.text((rect_x2 + int(width * 0.01), rect_y1), "CT值", font=legend_font, fill=(0, 0, 0))

    # Enhancement coefficient legend (triangle + text)
    tri_base_x = legend_box[0] + int(width * 0.33)
    tri_y = rect_y1 + int((rect_y2 - rect_y1) / 2)
    tri_size = int(height * 0.035)
    triangle = [
        (tri_base_x, tri_y + tri_size // 2),
        (tri_base_x + tri_size, tri_y + tri_size // 2),
        (tri_base_x + tri_size / 2, tri_y - tri_size // 2),
    ]
    draw.polygon(triangle, outline=(0, 120, 255), fill=None)
    draw.text((tri_base_x + tri_size + int(width * 0.01), rect_y1), "增强系数", font=legend_font, fill=(0, 0, 0))

    # 2) Regression equation (centered above dashed line)
    eq_box = [
        int(width * 0.25),
        int(height * 0.20),
        int(width * 0.80),
        int(height * 0.30),
    ]
    draw.rectangle(eq_box, fill=(255, 255, 255))
    eq_text = "β = 1.087 + 0.012 × TOD (R² = 0.94)"
    tw, th = get_text_size(eq_font, eq_text)
    eq_x = eq_box[0] + (eq_box[2] - eq_box[0] - tw) / 2
    eq_y = eq_box[1] + (eq_box[2] - eq_box[1] - th) / 2
    draw.text((eq_x, eq_y), eq_text, font=eq_font, fill=(0, 0, 0))

    # 3) Axis titles (Chinese)
    # First, cover original English axis titles with white rectangles to avoid overlap
    # Left Y-axis area
    left_axis_box = [
        int(width * 0.0),
        int(height * 0.10),
        int(width * 0.16),
        int(height * 0.92),
    ]
    draw.rectangle(left_axis_box, fill=(255, 255, 255))
    # Right Y-axis area
    right_axis_box = [
        int(width * 0.84),
        int(height * 0.10),
        int(width * 1.0),
        int(height * 0.92),
    ]
    draw.rectangle(right_axis_box, fill=(255, 255, 255))

    # Left Y-axis: CT value (mg·h/L)
    draw_vertical_text(
        img,
        "CT值 (mg·h/L)",
        axis_font,
        center_xy=(int(width * 0.085), height / 2),
        fill=(0, 0, 0),
    )
    # Right Y-axis: Enhancement coefficient (β)
    draw_vertical_text(
        img,
        "增强系数 (β)",
        axis_font,
        center_xy=(int(width * 0.915), height / 2),
        fill=(0, 0, 0),
    )

    # X-axis: TOD concentration (mg/L)
    # Cover a slightly larger bottom band to hide original English label
    x_title_box = [
        int(width * 0.20),
        int(height * 0.80),
        int(width * 0.85),
        int(height * 0.99),
    ]
    draw.rectangle(x_title_box, fill=(255, 255, 255))
    x_text = "TOD 浓度 (mg/L)"
    xw, xh = get_text_size(axis_font, x_text)
    xt = x_title_box[0] + (x_title_box[2] - x_title_box[0] - xw) / 2
    yt = x_title_box[1] + (x_title_box[3] - x_title_box[1] - xh) / 2
    draw.text((xt, yt), x_text, font=axis_font, fill=(0, 0, 0))

    img.save(out_path)
    print(f"Saved translated figure to: {out_path}")


if __name__ == "__main__":
    main()

