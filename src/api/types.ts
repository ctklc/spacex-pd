export type Ship = {
  id: string;
  image: string;
  name: string;
  type: string;
};

export type Ships = { ships: Ship[] };

export type ShipVars = {
  limit?: number;
  offset?: number;
};
