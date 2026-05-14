"use client";

import { motion } from "framer-motion";
import PiCard from "@/components/PiCard";

export default function LabIntroSection() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >
      <PiCard />
    </motion.section>
  );
}

