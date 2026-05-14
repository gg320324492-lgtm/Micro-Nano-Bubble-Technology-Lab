from pathlib import Path


def main() -> None:
    target_dir = Path(r"C:\Users\admin\Desktop\Gaussian_CO2_Case")
    target_dir.mkdir(parents=True, exist_ok=True)

    gjf_content = """%chk=bubble_interface_anion.chk
%nprocshared=8
%mem=12GB
#p UB3LYP/6-31+G(d,p) Opt SCF=(XQC,Tight) Integral=UltraFine NoSymm

Charged air-bubble/water interface model (8 explicit H2O), anionic interface

-1 2
O  -1.847521  -1.847521  -1.847521
H  -2.723584  -1.650108  -2.186846
H  -1.650108  -2.723584  -2.186846
O  -1.847521  -1.847521   1.847521
H  -2.723584  -1.650108   2.186846
H  -1.650108  -2.723584   2.186846
O  -1.847521   1.847521  -1.847521
H  -1.650108   2.723584  -2.186846
H  -2.723584   1.650108  -2.186846
O  -1.847521   1.847521   1.847521
H  -1.650108   2.723584   2.186846
H  -2.723584   1.650108   2.186846
O   1.847521  -1.847521  -1.847521
H   1.650108  -2.723584  -2.186846
H   2.723584  -1.650108  -2.186846
O   1.847521  -1.847521   1.847521
H   1.650108  -2.723584   2.186846
H   2.723584  -1.650108   2.186846
O   1.847521   1.847521  -1.847521
H   2.723584   1.650108  -2.186846
H   1.650108   2.723584  -2.186846
O   1.847521   1.847521   1.847521
H   2.723584   1.650108   2.186846
H   1.650108   2.723584   2.186846

"""

    bat_content = """@echo off
cd /d %~dp0
echo Running charged bubble interface optimization (Gaussian g16)...
g16 bubble_interface_anion_opt.gjf > bubble_interface_anion_opt_cmd_stdout.txt 2>&1
echo Done.
pause
"""

    readme_content = """文件说明：
1) bubble_interface_anion_opt.gjf
   - 带电气泡气液界面模型（总电荷 -1，自旋多重度 2）
   - 8 个显式水分子围成界面壳层，中心为空腔（近似空气气泡）
   - 任务：结构优化（Opt）

2) run_bubble_interface_anion_opt.bat
   - 双击后调用 g16 提交上述优化任务

手动运行：
   cd /d C:\\Users\\admin\\Desktop\\Gaussian_CO2_Case
   g16 bubble_interface_anion_opt.gjf > bubble_interface_anion_opt_cmd_stdout.txt 2>&1
"""

    xyz_content = """24
Charged bubble-water interface shell (8 waters), cavity at origin
O  -1.847521  -1.847521  -1.847521
H  -2.723584  -1.650108  -2.186846
H  -1.650108  -2.723584  -2.186846
O  -1.847521  -1.847521   1.847521
H  -2.723584  -1.650108   2.186846
H  -1.650108  -2.723584   2.186846
O  -1.847521   1.847521  -1.847521
H  -1.650108   2.723584  -2.186846
H  -2.723584   1.650108  -2.186846
O  -1.847521   1.847521   1.847521
H  -1.650108   2.723584   2.186846
H  -2.723584   1.650108   2.186846
O   1.847521  -1.847521  -1.847521
H   1.650108  -2.723584  -2.186846
H   2.723584  -1.650108  -2.186846
O   1.847521  -1.847521   1.847521
H   1.650108  -2.723584   2.186846
H   2.723584  -1.650108   2.186846
O   1.847521   1.847521  -1.847521
H   2.723584   1.650108  -2.186846
H   1.650108   2.723584  -2.186846
O   1.847521   1.847521   1.847521
H   2.723584   1.650108   2.186846
H   1.650108   2.723584   2.186846
"""

    (target_dir / "bubble_interface_anion_opt.gjf").write_text(gjf_content, encoding="ascii")
    (target_dir / "run_bubble_interface_anion_opt.bat").write_text(bat_content, encoding="ascii")
    (target_dir / "README_bubble_interface.txt").write_text(readme_content, encoding="utf-8")
    (target_dir / "bubble_interface_anion_initial.xyz").write_text(xyz_content, encoding="ascii")

    print(f"Created files in: {target_dir}")


if __name__ == "__main__":
    main()