import rawProjects from "./projects.json";

export type ProjectSection = "featured" | "shipped" | "lab";

export interface ProjectLink {
  label: string;
  href?: string;
}

export type ProjectExternalLinkState = "live" | "locked";

export interface LiveProjectExternalLink {
  state: "live";
  href: string;
}

export interface LockedProjectExternalLink {
  state: "locked";
}

export type ProjectExternalLink =
  | LiveProjectExternalLink
  | LockedProjectExternalLink;

export interface ProjectExternalLinks {
  playStore?: ProjectExternalLink;
  appStore?: ProjectExternalLink;
  website?: ProjectExternalLink;
  github?: ProjectExternalLink;
}

export interface ProjectGalleryItem {
  src: string;
  alt: string;
  caption?: string;
}

export interface ProjectVideoDemo {
  url: string;
  poster?: string;
  title?: string;
}

export type ProjectAccessState = "locked";

export interface ProjectAccess {
  state: "locked";
  code: string;
  label?: string;
}

export interface ProjectItem {
  section: ProjectSection;
  slug?: string;
  title: string;
  type: string;
  role: string;
  oneLineValue: string;
  whyItMatters: string;
  proofBullets: string[];
  detailBullets?: string[];
  stack: string[];
  banner?: string;
  link?: ProjectLink;
  externalLinks?: ProjectExternalLinks;
  gallery?: ProjectGalleryItem[];
  videoDemo?: ProjectVideoDemo;
  access?: ProjectAccess;
}

export interface FeaturedProjectItem extends ProjectItem {
  section: "featured";
  slug: string;
  banner: string;
}

export interface DetailProjectItem extends ProjectItem {
  slug: string;
}

const VALID_SECTIONS = new Set<ProjectSection>(["featured", "shipped", "lab"]);
const VALID_EXTERNAL_LINK_STATES = new Set<ProjectExternalLinkState>([
  "live",
  "locked",
]);
const EXTERNAL_LINK_KEYS = [
  "playStore",
  "appStore",
  "website",
  "github",
] as const;

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const assertString = (
  value: unknown,
  path: string,
  options: { optional?: boolean } = {},
): string | undefined => {
  if (value === undefined && options.optional) {
    return undefined;
  }

  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`${path} must be a non-empty string.`);
  }

  return value;
};

const assertStringArray = (value: unknown, path: string): string[] => {
  if (!Array.isArray(value) || value.some((item) => typeof item !== "string")) {
    throw new Error(`${path} must be an array of strings.`);
  }

  return value;
};

const assertLink = (value: unknown, path: string): ProjectLink | undefined => {
  if (value === undefined) {
    return undefined;
  }

  if (!isRecord(value)) {
    throw new Error(`${path} must be an object.`);
  }

  const label = assertString(value.label, `${path}.label`);
  const href = assertString(value.href, `${path}.href`, { optional: true });

  return href ? { label, href } : { label };
};

const assertExternalLink = (
  value: unknown,
  path: string,
): ProjectExternalLink => {
  if (!isRecord(value)) {
    throw new Error(`${path} must be an object.`);
  }

  const state = assertString(value.state, `${path}.state`) as ProjectExternalLinkState;

  if (!VALID_EXTERNAL_LINK_STATES.has(state)) {
    throw new Error(`${path}.state must be "live" or "locked".`);
  }

  if (state === "live") {
    return {
      state,
      href: assertString(value.href, `${path}.href`) as string,
    };
  }

  if (value.href !== undefined) {
    throw new Error(`${path}.href is not allowed when state is "locked".`);
  }

  return { state };
};

const assertExternalLinks = (
  value: unknown,
  path: string,
): ProjectExternalLinks | undefined => {
  if (value === undefined) {
    return undefined;
  }

  if (!isRecord(value)) {
    throw new Error(`${path} must be an object.`);
  }

  const invalidKeys = Object.keys(value).filter(
    (key) => !EXTERNAL_LINK_KEYS.includes(key as (typeof EXTERNAL_LINK_KEYS)[number]),
  );

  if (invalidKeys.length) {
    throw new Error(
      `${path} contains unsupported keys: ${invalidKeys.join(", ")}.`,
    );
  }

  const externalLinks: ProjectExternalLinks = {};

  for (const key of EXTERNAL_LINK_KEYS) {
    const entry = value[key];

    if (entry !== undefined) {
      externalLinks[key] = assertExternalLink(entry, `${path}.${key}`);
    }
  }

  return Object.keys(externalLinks).length > 0 ? externalLinks : undefined;
};

const assertGalleryItem = (
  value: unknown,
  path: string,
): ProjectGalleryItem => {
  if (!isRecord(value)) {
    throw new Error(`${path} must be an object.`);
  }

  return {
    src: assertString(value.src, `${path}.src`) as string,
    alt: assertString(value.alt, `${path}.alt`) as string,
    caption: assertString(value.caption, `${path}.caption`, { optional: true }),
  };
};

const assertGallery = (
  value: unknown,
  path: string,
): ProjectGalleryItem[] | undefined => {
  if (value === undefined) {
    return undefined;
  }

  if (!Array.isArray(value) || value.length === 0) {
    throw new Error(`${path} must be a non-empty array.`);
  }

  return value.map((item, index) => assertGalleryItem(item, `${path}[${index}]`));
};

const assertVideoDemo = (
  value: unknown,
  path: string,
): ProjectVideoDemo | undefined => {
  if (value === undefined) {
    return undefined;
  }

  if (!isRecord(value)) {
    throw new Error(`${path} must be an object.`);
  }

  return {
    url: assertString(value.url, `${path}.url`) as string,
    poster: assertString(value.poster, `${path}.poster`, { optional: true }),
    title: assertString(value.title, `${path}.title`, { optional: true }),
  };
};

const assertAccess = (
  value: unknown,
  path: string,
): ProjectAccess | undefined => {
  if (value === undefined) {
    return undefined;
  }

  if (!isRecord(value)) {
    throw new Error(`${path} must be an object.`);
  }

  const state = assertString(value.state, `${path}.state`) as ProjectAccessState;

  if (state !== "locked") {
    throw new Error(`${path}.state must be "locked".`);
  }

  return {
    state,
    code: assertString(value.code, `${path}.code`) as string,
    label: assertString(value.label, `${path}.label`, { optional: true }),
  };
};

const parseProject = (value: unknown, index: number): ProjectItem => {
  const path = `projects.json[${index}]`;

  if (!isRecord(value)) {
    throw new Error(`${path} must be an object.`);
  }

  const section = assertString(value.section, `${path}.section`) as ProjectSection;

  if (!VALID_SECTIONS.has(section)) {
    throw new Error(
      `${path}.section must be one of "featured", "shipped", or "lab".`,
    );
  }

  const project: ProjectItem = {
    section,
    slug: assertString(value.slug, `${path}.slug`, { optional: true }),
    title: assertString(value.title, `${path}.title`) as string,
    type: assertString(value.type, `${path}.type`) as string,
    role: assertString(value.role, `${path}.role`) as string,
    oneLineValue: assertString(value.oneLineValue, `${path}.oneLineValue`) as string,
    whyItMatters: assertString(value.whyItMatters, `${path}.whyItMatters`) as string,
    proofBullets: assertStringArray(value.proofBullets, `${path}.proofBullets`),
    detailBullets:
      value.detailBullets === undefined
        ? undefined
        : assertStringArray(value.detailBullets, `${path}.detailBullets`),
    stack: assertStringArray(value.stack, `${path}.stack`),
    banner: assertString(value.banner, `${path}.banner`, { optional: true }),
    link: assertLink(value.link, `${path}.link`),
    externalLinks: assertExternalLinks(value.externalLinks, `${path}.externalLinks`),
    gallery: assertGallery(value.gallery, `${path}.gallery`),
    videoDemo: assertVideoDemo(value.videoDemo, `${path}.videoDemo`),
    access: assertAccess(value.access, `${path}.access`),
  };

  if (section === "featured") {
    if (!project.slug) {
      throw new Error(`${path}.slug is required for featured projects.`);
    }

    if (!project.banner) {
      throw new Error(`${path}.banner is required for featured projects.`);
    }
  }

  return project;
};

const parseProjects = (value: unknown): ProjectItem[] => {
  if (!Array.isArray(value)) {
    throw new Error("projects.json must export an array.");
  }

  const projects = value.map((entry, index) => parseProject(entry, index));
  const slugSet = new Set<string>();

  for (const project of projects) {
    if (!project.slug) {
      continue;
    }

    if (slugSet.has(project.slug)) {
      throw new Error(`Duplicate project slug found in projects.json: "${project.slug}".`);
    }

    slugSet.add(project.slug);
  }

  return projects;
};

export const allProjects = parseProjects(rawProjects);

export const featuredProjects = allProjects.filter(
  (project): project is FeaturedProjectItem => project.section === "featured",
);

export const shippedProjects = allProjects.filter(
  (project): project is ProjectItem => project.section === "shipped",
);

export const labProjects = allProjects.filter(
  (project): project is ProjectItem => project.section === "lab",
);

export const detailProjects = allProjects.filter(
  (project): project is DetailProjectItem => typeof project.slug === "string",
);

export const detailProjectPaths = detailProjects.map((project) => ({
  params: { slug: project.slug },
  props: { project },
}));
