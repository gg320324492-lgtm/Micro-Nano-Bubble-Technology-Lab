import com.comsol.model.*;
import com.comsol.model.util.*;

public class NanoBubbleCavitationTemplate {

  private static final String OUT_DIR = "C:\\Users\\admin\\Desktop\\NanoBubble_Cavitation_COMSOL";

  public static Model run() {
    Model model = ModelUtil.create("Model");

    model.modelPath(OUT_DIR);
    model.label("nanobubble_cavitation_template.mph");
    model.comments(
        "Nanobubble acoustic cavitation template (R0=300 nm, f=500 kHz, Pa=0.30 MPa).\n"
            + "This template is created by COMSOL Java API and is ready for GUI refinement.");

    // ===== Parameters (baseline B) =====
    model.param().set("R0", "300[nm]", "Initial bubble radius");
    model.param().set("f0", "500[kHz]", "Ultrasound frequency");
    model.param().set("Pa", "0.30[MPa]", "Acoustic pressure amplitude");
    model.param().set("p0", "1[atm]", "Ambient pressure");

    model.param().set("Rdom", "10[um]", "Radial size of liquid domain");
    model.param().set("Hdom", "20[um]", "Axial size of liquid domain");
    model.param().set("z0", "6[um]", "Initial bubble center (z)");
    model.param().set("T", "1/f0", "Acoustic period");

    model.param().set("rho_l", "998[kg/m^3]", "Liquid density");
    model.param().set("mu_l", "1e-3[Pa*s]", "Liquid dynamic viscosity");
    model.param().set("rho_g", "1.2[kg/m^3]", "Gas density");
    model.param().set("mu_g", "1.8e-5[Pa*s]", "Gas dynamic viscosity");
    model.param().set("sigma", "0.072[N/m]", "Surface tension");

    // ===== Geometry: 2D axisymmetric rectangle + initial bubble circle =====
    model.component().create("comp1", true);
    model.component("comp1").geom().create("geom1", 2);
    model.component("comp1").geom("geom1").axisymmetric(true);

    model.component("comp1").geom("geom1").feature().create("r1", "Rectangle");
    model.component("comp1").geom("geom1").feature("r1").set("size", new String[] {"Rdom", "Hdom"});
    model.component("comp1").geom("geom1").feature("r1").set("base", "corner");
    model.component("comp1").geom("geom1").feature("r1").set("pos", new String[] {"0", "0"});

    model.component("comp1").geom("geom1").feature().create("c1", "Circle");
    model.component("comp1").geom("geom1").feature("c1").set("r", "R0");
    model.component("comp1").geom("geom1").feature("c1").set("pos", new String[] {"0", "z0"});

    model.component("comp1").geom("geom1").run();

    // ===== Mesh and transient study placeholders =====
    model.component("comp1").mesh().create("mesh1");
    model.component("comp1").mesh("mesh1").autoMeshSize(4);

    model.study().create("std1");
    model.study("std1").create("time", "Transient");
    model.study("std1").feature("time").set("tlist", "range(0,2e-8,8e-5)");

    return model;
  }

  public static void main(String[] args) {
    try {
      Model model = run();
      model.save(OUT_DIR + "\\nanobubble_cavitation_template.mph");
    } catch (Exception e) {
      throw new RuntimeException("Failed to save COMSOL model", e);
    } finally {
      ModelUtil.disconnect();
    }
  }
}
