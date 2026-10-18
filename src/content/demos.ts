/**
 * Real demo sites shown on the landing page, one per industry group.
 * Sourced from the same real projects shown on the Work page.
 */
import { projects, type Project } from "@/content/projects";

export interface Demo extends Omit<Project, "category"> {
  /** e.g. "Home business" */
  group: string;
}

export const demos: Demo[] = projects.map(({ category, ...p }) => ({ ...p, group: category }));
