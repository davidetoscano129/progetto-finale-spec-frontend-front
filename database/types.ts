type Details = {
  duration: number; // in weeks
  price: number; // in euros
  team_size: number; // number of consultants involved
  remote_option: boolean; // true if remote consulting is available
  support: string; // es. "3 months", "none"
  best_for: string; // es. "SMEs", "large companies", "startups"
};

export type ConsultingPackage = {
  readonly id: number;
  readonly title: string;
  readonly category: string;
  details: Details;
};
