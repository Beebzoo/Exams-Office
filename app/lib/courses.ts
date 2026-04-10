// MSP courses known to use TestVision for their final exam.
// Useful for: identifying which courses need digital exam setup, DexUM Portal imports,
// UNS50/Chromebook logistics, and which CCs to contact about TestVision deadlines.

export type TVCourse = {
  code: string;
  name: string;
  coordinators: string;
};

export const TESTVISION_COURSES: TVCourse[] = [
  { code: "INT3014", name: "Conservation Palaeobiology", coordinators: "Prof. Dr. Frank Wesselingh & Dr. Jesse Hennekam" },
  { code: "INT3001", name: "The Philosophy of Technology", coordinators: "Massimiliano Simons & Robert Gianni" },
  { code: "NEU2005", name: "Systems Neuroscience", coordinators: "Michelle Moerel" },
  { code: "INT3002", name: "Advanced Microscopy: Theory and Applications", coordinators: "Dimitris Kapsokalyvas" },
  { code: "NEU2003", name: "Neuroethology", coordinators: "Dr. Linnea van Griethuijsen" },
  { code: "INT3007", name: "Systems Biology", coordinators: "Dr. Martina Summer-Kutmon" },
  { code: "INT3005", name: "Biobased Materials and Technology", coordinators: "Prof. Yvonne van der Meer & Dr. Katie Saralidze" },
  { code: "CHE2006", name: "Biochemistry", coordinators: "Prof. dr. L. Schurgers, Dr. A. Jaminon, Dr. S. Agten, N. Deckers (corresponding coordinator)" },
  { code: "BIO2010", name: "Human Anatomy and Physiology", coordinators: "Aaron Isaacs" },
  { code: "BIO2005", name: "Evolutionary Biology", coordinators: "Dr. Linnea van Griethuijsen" },
  { code: "NEU1001", name: "Introduction to Neuroscience: Perception", coordinators: "Dr. L. de Nijs" },
  { code: "BIO2001", name: "Cell Biology", coordinators: "Prof. dr. Martijn van Griensven & Dr Aart van Apeldoorn" },
  { code: "INT3003", name: "Biomaterials", coordinators: "Dr. C. Mota & Dr. P. Wieringa" },
  { code: "PRA3017", name: "Applied Cell Biology", coordinators: "Dr. Silvia Bolognin" },
  { code: "INT3008", name: "Regenerative Medicine", coordinators: "Dr. D. Kilian" },
  { code: "INT1003", name: "Introduction to Biomedical Engineering", coordinators: "Daan van Beek" },
  { code: "BIO3004", name: "Animal Behaviour", coordinators: "Dr. Linnea van Griethuijsen" },
  { code: "INT2008", name: "Molecular Toxicology", coordinators: "Dr. Misha Vrolijk" },
];
