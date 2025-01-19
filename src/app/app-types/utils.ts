export type MergeTag =
  | {
      value: string;
    }
  | {
      title: string;
      menu: MergeTag[];
    };
