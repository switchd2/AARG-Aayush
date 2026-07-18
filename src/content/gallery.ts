export interface GalleryItem {
  id: string;
  title: string;
  category: "flight" | "build" | "competition";
  description: string;
  imageUrl: string;
}

export const galleryItems: GalleryItem[] = [
  {
    id: "build-1",
    title: "Lab Build Session",
    category: "build",
    description: "Team working on avionics integration and hardware assembly at the AARG workshop.",
    imageUrl: "/images/gallery_build_1.jpg",
  },
  {
    id: "flight-1",
    title: "Fixed-Wing Hand Launch",
    category: "flight",
    description: "Hand-launching the fixed-wing UAV for an autonomous flight test on the field.",
    imageUrl: "/images/gallery_flight_1.jpg",
  },
  {
    id: "flight-2",
    title: "Fixed-Wing Urban Flight",
    category: "flight",
    description: "Fixed-wing aircraft in controlled low-altitude flight near campus infrastructure.",
    imageUrl: "/images/gallery_flight_2.jpg",
  },
  {
    id: "competition-1",
    title: "NIDAR Presentation — Jan 2026",
    category: "competition",
    description: "Presenting the Autonomous Edge UAV system at NIDAR, Gautam Buddha University.",
    imageUrl: "/images/gallery_competition_1.jpg",
  },
  {
    id: "build-2",
    title: "Multirotor on Landing Pad",
    category: "build",
    description: "Hexacopter ready for takeoff on a custom landing pad during field trials.",
    imageUrl: "/images/gallery_build_2.jpg",
  },
  {
    id: "flight-3",
    title: "Autonomous Quadcopter Flight",
    category: "flight",
    description: "Our custom quadcopter performing autonomous flight testing near facility buildings.",
    imageUrl: "/images/gallery_flight_3.jpg",
  },
  {
    id: "build-3",
    title: "Avionics Integration & Setup",
    category: "build",
    description: "Members setting up software parameters and monitoring telemetry links at the lab workspace.",
    imageUrl: "/images/gallery_build_3.jpg",
  },
  {
    id: "build-4",
    title: "Hexacopter Known Aero",
    category: "build",
    description: "Detailing hardware layout, flight controller config, and propulsion tests on the bench.",
    imageUrl: "/images/gallery_build_4.jpg",
  },
  {
    id: "flight-4",
    title: "post flight",
    category: "flight",
    description: "Performing pre-flight inspection and manual compass calibration before an outdoor trial.",
    imageUrl: "/images/gallery_flight_4.jpg",
  },
  {
    id: "competition-2",
    title: "IGNITE AIR 24 Award at NIDAR",
    category: "competition",
    description: "Team Aero Guardian securing Rank AIR 24 at the NIDAR 2025-26 Drone Innovation Challenge.",
    imageUrl: "/images/gallery_competition_2.jpg",
  },
  {
    id: "competition-3",
    title: "NIDAR 2025 Team Shield",
    category: "competition",
    description: "NIDAR 2025 team shield and collaborating sponsors of Team Aero Guardians.",
    imageUrl: "/images/gallery_competition_3.jpg",
  },
  {
    id: "flight-5",
    title: "Fixed-Wing Field Assembly",
    category: "flight",
    description: "Conducting tests and checking airframe config of a custom RC plane out on the field in Pune.",
    imageUrl: "/images/gallery_flight_5.jpg",
  },
  {
    id: "flight-6",
    title: "RC Fixed-Wing Check",
    category: "flight",
    description: "Analyzing mechanical surface actuators and servos on the custom cardboard fixed-wing model.",
    imageUrl: "/images/gallery_flight_6.jpg",
  },
  {
    id: "build-5",
    title: "Quadcopter and Hexacopter Lineup",
    category: "build",
    description: "Two fully built UAV test rigs standing ready next to field support gear.",
    imageUrl: "/images/gallery_build_5.jpg",
  },
];
