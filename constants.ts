export const SYLLABUS_DATA = {
  subject_topics: [
    {
      subject_id: "Maths",
      subject_name: "Mathematics",
      is_jee_only: true, // Only for JEE path
      difficulty_level: "Medium",
      sequence: 1,
      topics: [
        {
          topic_id: "m_1",
          topic_name: "Sets, Relations, and Functions",
        },
        {
          topic_id: "m_2",
          topic_name: "Complex Numbers and Quadratic Equations",
        },
        {
          topic_id: "m_3",
          topic_name: "Matrices and Determinants",
        },
        {
          topic_id: "m_4",
          topic_name: "Permutations and Combinations",
        },
        {
          topic_id: "m_5",
          topic_name: "Binomial Theorem and Its Simple Applications",
        },
        {
          topic_id: "m_6",
          topic_name: "Sequence and Series",
        },
        {
          topic_id: "m_7",
          topic_name: "Limit, Continuity, and Differentiability",
        },
        {
          topic_id: "m_8",
          topic_name: "Integral Calculus",
        },
        {
          topic_id: "m_9",
          topic_name: "Differential Equations",
        },
        {
          topic_id: "m_10",
          topic_name: "Coordinate Geometry",
        },
        {
          topic_id: "m_11",
          topic_name: "Three Dimensional Geometry",
        },
        {
          topic_id: "m_12",
          topic_name: "Vector Algebra",
        },
        {
          topic_id: "m_13",
          topic_name: "Statistics and Probability",
        },
        {
          topic_id: "m_14",
          topic_name: "Trigonometry",
        }
      ]
    },
    {
      subject_id: "Physics",
      subject_name: "Physics",
      difficulty_level: "Hard",
      sequence: 2,
      topics: [
        {
          topic_id: "p_1",
          topic_name: "Physics and Measurement",
        },
        {
          topic_id: "p_2",
          topic_name: "Kinematics",
        },
        {
          topic_id: "p_3",
          topic_name: "Laws of Motion",
        },
        {
          topic_id: "p_4",
          topic_name: "Work, Energy, and Power",
        },
        {
          topic_id: "p_5",
          topic_name: "Rotational Motion",
        },
        {
          topic_id: "p_6",
          topic_name: "Gravitation",
        },
        {
          topic_id: "p_7",
          topic_name: "Properties of Solids and Liquids",
        },
        {
          topic_id: "p_8",
          topic_name: "Thermodynamics",
        },
        {
          topic_id: "p_9",
          topic_name: "Kinetic Theory of Gases",
        },
        {
          topic_id: "p_10",
          topic_name: "Oscillations and Waves",
        },
        {
          topic_id: "p_11",
          topic_name: "Electrostatics",
        },
        {
          topic_id: "p_12",
          topic_name: "Current Electricity",
        },
        {
          topic_id: "p_13",
          topic_name: "Magnetic Effects of Current and Magnetism",
        },
        {
          topic_id: "p_14",
          topic_name: "Electromagnetic Induction and Alternating Currents",
        },
        {
          topic_id: "p_15",
          topic_name: "Electromagnetic Waves",
        },
        {
          topic_id: "p_16",
          topic_name: "Optics",
        },
        {
          topic_id: "p_17",
          topic_name: "Dual Nature of Matter and Radiation",
        },
        {
          topic_id: "p_18",
          topic_name: "Atoms and Nuclei",
        },
        {
          topic_id: "p_19",
          topic_name: "Electronic Devices",
        },
        {
          topic_id: "p_20",
          topic_name: "Experimental Skills",
        }
      ]
    },
    {
      subject_id: "Chemistry",
      subject_name: "Chemistry",
      difficulty_level: "Medium",
      sequence: 3,
      categories: [
        {
          category_name: "Physical Chemistry",
          topics: [
            {
              topic_id: "c_p_1",
              topic_name: "Some Basic Concepts in Chemistry",
            },
            {
              topic_id: "c_p_2",
              topic_name: "Atomic Structure",
            },
            {
              topic_id: "c_p_3",
              topic_name: "Chemical Bonding and Molecular Structure",
            },
            {
              topic_id: "c_p_4",
              topic_name: "Chemical Thermodynamics",
            },
            {
              topic_id: "c_p_5",
              topic_name: "Solutions",
            },
            {
              topic_id: "c_p_6",
              topic_name: "Equilibrium",
            },
            {
              topic_id: "c_p_7",
              topic_name: "Redox Reactions and Electrochemistry",
            },
            {
              topic_id: "c_p_8",
              topic_name: "Chemical Kinetics",
            }
          ]
        },
        {
          category_name: "Inorganic Chemistry",
          topics: [
            {
              topic_id: "c_i_1",
              topic_name: "Classification of Elements and Periodicity in Properties",
            },
            {
              topic_id: "c_i_2",
              topic_name: "p-Block Elements",
            },
            {
              topic_id: "c_i_3",
              topic_name: "d- and f-Block Elements",
            },
            {
              topic_id: "c_i_4",
              topic_name: "Coordination Compounds",
            }
          ]
        },
        {
          category_name: "Organic Chemistry",
          topics: [
            {
              topic_id: "c_o_1",
              topic_name: "Purification and Characterisation of Organic Compounds",
            },
            {
              topic_id: "c_o_2",
              topic_name: "Some Basic Principles of Organic Chemistry",
            },
            {
              topic_id: "c_o_3",
              topic_name: "Hydrocarbons",
            },
            {
              topic_id: "c_o_4",
              topic_name: "Organic Compounds Containing Halogens",
            },
            {
              topic_id: "c_o_5",
              topic_name: "Organic Compounds Containing Oxygen",
            },
            {
              topic_id: "c_o_6",
              topic_name: "Organic Compounds Containing Nitrogen",
            },
            {
              topic_id: "c_o_7",
              topic_name: "Biomolecules",
            },
            {
              topic_id: "c_o_8",
              topic_name: "Principles Related to Practical Chemistry",
            }
          ]
        }
      ]
    },
    {
      subject_id: "Biology",
      subject_name: "Biology",
      is_neet_only: true, // Only for NEET path
      difficulty_level: "High",
      sequence: 4,
      topics: [
        {
          topic_id: "b_1",
          topic_name: "Diversity in Living World",
        },
        {
          topic_id: "b_2",
          topic_name: "Structural Organisation in Animals and Plants",
        },
        {
          topic_id: "b_3",
          topic_name: "Cell Structure and Function",
        },
        {
          topic_id: "b_4",
          topic_name: "Plant Physiology",
        },
        {
          topic_id: "b_5",
          topic_name: "Human Physiology",
        },
        {
          topic_id: "b_6",
          topic_name: "Reproduction",
        },
        {
          topic_id: "b_7",
          topic_name: "Genetics and Evolution",
        },
        {
          topic_id: "b_8",
          topic_name: "Biology and Human Welfare",
        },
        {
          topic_id: "b_9",
          topic_name: "Biotechnology and Its Applications",
        },
        {
          topic_id: "b_10",
          topic_name: "Ecology and environment",
        }
      ]
    }
  ]
};
