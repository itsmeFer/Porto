"use client";

import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { useMemo, useState, useEffect, useRef, type CSSProperties } from "react";
import { projects } from "../data/portfolio";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../data/translations";
import ProjectShowcaseModal from "./ProjectShowcaseModal";
import ProjectShowcaseDokter from "./dokter/ProjectShowcaseDokter";
import ProjectShowcaseHomecare from "./homecare/ProjectShowcaseHomecare";
import ProjectShowcaseGYM from "./gym/ProjectShowcaseGYM";
import ProjectShowcaseAntrianku from "./antrianku/ProjectShowcaseAntrianku";
import styles from "./ProjectsSection.module.css";

function isRoyalProject(project: { title: string; category?: string }) {
  const title = project.title.toLowerCase();
  const category = String(project.category ?? "").toLowerCase();

  return (
    title.includes("royal") ||
    title.includes("klinik") ||
    category.includes("healthcare")
  );
}

function isDokterProject(project: { title: string; category?: string }) {
  const title = project.title.toLowerCase();
  const category = String(project.category ?? "").toLowerCase();

  return (
    title.includes("dokter") ||
    title.includes("rekam medis") ||
    category.includes("doctor")
  );
}

function isHomecareProject(project: { title: string; category?: string }) {
  const title = project.title.toLowerCase();
  const category = String(project.category ?? "").toLowerCase();

  return (
    title.includes("homecare") ||
    title.includes("home care") ||
    category.includes("homecare") ||
    category.includes("home care")
  );
}

function isGymProject(project: { title: string; category?: string }) {
  const title = project.title.toLowerCase();
  const category = String(project.category ?? "").toLowerCase();

  return (
    title.includes("gym") ||
    title.includes("fitness") ||
    title.includes("prima fitness") ||
    title.includes("fitness club") ||
    category.includes("gym") ||
    category.includes("fitness")
  );
}

function isAntriankuProject(project: { title: string; category?: string }) {
  const title = project.title.toLowerCase();
  const category = String(project.category ?? "").toLowerCase();

  return (
    title.includes("antrianku") ||
    title.includes("antrian") ||
    category.includes("queue")
  );
}

function getProjectImage(project: {
  title: string;
  imageUrl?: string;
  category?: string;
}) {
  if (isGymProject(project)) {
    return project.imageUrl || "/gym/1.png";
  }

  if (isDokterProject(project)) {
    return project.imageUrl || "/royal/showcase/website/dokter.png";
  }

  if (isRoyalProject(project)) {
    return "/royal/showcase/beranda.png";
  }

  return project.imageUrl || "";
}

function getProjectInitial(title: string) {
  return title
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function ProjectsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isSettling, setIsSettling] = useState(false);
  const [showcaseOpen, setShowcaseOpen] = useState(false);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const sectionRef = useRef<HTMLElement>(null);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsDark(entry.isIntersecting);
          if (entry.isIntersecting) {
            document.body.classList.add("theme-dark-header");
          } else {
            document.body.classList.remove("theme-dark-header");
          }
        });
      },
      {
        threshold: 0.15, // Trigger when 15% of the section is visible
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
      document.body.classList.remove("theme-dark-header");
    };
  }, []);

  const { lang } = useLanguage();
  const t = translations[lang].projects;

  const localizedProjects = useMemo(() => {
    return projects.map((project, idx) => {
      const translated = t.items[idx] || {};
      return {
        ...project,
        title: translated.title || project.title,
        category: translated.category || project.category,
        description: translated.description || project.description,
        tech: translated.tech || project.tech,
      };
    });
  }, [lang, t.items]);

  const activeProject = localizedProjects[activeIndex];

  const sliderProjects = useMemo(() => {
    return localizedProjects.map((project, index) => {
      let offset = index - activeIndex;

      if (offset > localizedProjects.length / 2) {
        offset -= localizedProjects.length;
      }

      if (offset < -localizedProjects.length / 2) {
        offset += localizedProjects.length;
      }

      return {
        ...project,
        offset,
        index,
      };
    });
  }, [activeIndex, localizedProjects]);

  const startSettling = () => {
    setIsSettling(true);

    window.setTimeout(() => {
      setIsSettling(false);
    }, 850);
  };

  const goPrev = () => {
    if (isSettling) return;
    startSettling();

    setActiveIndex((current) =>
      current === 0 ? localizedProjects.length - 1 : current - 1
    );
  };

  const goNext = () => {
    if (isSettling) return;
    startSettling();

    setActiveIndex((current) =>
      current === localizedProjects.length - 1 ? 0 : current + 1
    );
  };

  const selectProject = (index: number) => {
    if (index === activeIndex || isSettling) return;

    startSettling();
    setActiveIndex(index);
  };

  const openShowcase = (index: number) => {
    setActiveIndex(index);
    setShowcaseOpen(true);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (typeof window !== "undefined" && window.innerWidth < 1024) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <>
      <section
        id="projects"
        ref={sectionRef}
        className={`section ${styles.projectsSliderSection} ${isDark ? styles.isDarkTheme : ""}`}
        onMouseMove={handleMouseMove}
      >
      <div className={styles.dotBackground}></div>
      <div className={`container ${styles.scrollEntrance}`} style={{ position: "relative", zIndex: 1 }}>

          <div className={`${styles.projectSliderHead} section-head`}>
            <div className={styles.projectSliderTitle}>
              <div
                key={activeProject.title}
                className={styles.textRevealGroup}
              >
                <span className={`section-label ${styles.projectLabel}`}>
                  {t.badge}
                </span>

                {t.heading ? (() => {
                  const words = t.heading.split(" ");
                  const lastWord = words.pop();
                  return (
                    <h2 className={styles.projectHeadline}>
                      {words.join(" ")} <span className="section-title-highlight">{lastWord}</span>
                    </h2>
                  );
                })() : (
                  <h2 className={styles.projectHeadline}>{activeProject.title}</h2>
                )}

                <p className={styles.projectDescription} style={{ borderTop: "1px solid rgba(255, 255, 255, 0.1)", paddingTop: "24px", marginTop: "24px" }}>
                  <strong style={{ display: "block", marginBottom: "12px", color: "#ffffff" }}>{activeProject.title}</strong>
                  <span style={{ color: "rgba(255, 255, 255, 0.7)" }}>{activeProject.description}</span>
                </p>

                <div className={styles.activeProjectTech}>
                  {activeProject.tech.map((item, index) => (
                    <span
                      key={item}
                      style={
                        {
                          "--tech-delay": `${index * 70}ms`,
                        } as CSSProperties
                      }
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div
            className={[
              "reveal",
              styles.projectSliderStageWrap,
              isSettling ? styles.isSettling : "",
            ].join(" ")}
          >
            <button
              type="button"
              onClick={goPrev}
              aria-label="Project sebelumnya"
              className={`${styles.sideArrowButton} ${styles.sideArrowLeft}`}
            >
              <ArrowLeft size={22} />
            </button>

            <div className={styles.projectSliderStage}>
              {sliderProjects.map((project) => {
                const isActive = project.offset === 0;
                const isSide = Math.abs(project.offset) === 1;
                const isRoyal = isRoyalProject(project);
                const isDokter = isDokterProject(project);
                const isHomecare = isHomecareProject(project);
                const isGym = isGymProject(project);
                const isAntrianku = isAntriankuProject(project);
                const projectImage = getProjectImage(project);
                const projectInitial = getProjectInitial(project.title);
                const imageFailed = failedImages[project.title];

                return (
                  <article
                    key={project.title}
                    className={[
                      "project-card",
                      "royal-project-card",
                      styles.projectSlideCard,
                      isActive ? styles.isActive : "",
                      isSide ? styles.isSide : "",
                      !isActive && !isSide ? styles.isHidden : "",
                    ].join(" ")}
                    style={
                      {
                        "--slide-offset": project.offset,
                      } as CSSProperties
                    }
                    onClick={() => selectProject(project.index)}
                  >
                    <div
                      className={[
                        "project-image-wrap",
                        "royal-project-image-wrap",
                        styles.projectImageShell,
                        isRoyal ? styles.royalProjectImageShell : "",
                        isDokter ? styles.dokterProjectImageShell : "",
                        isHomecare ? styles.homecareProjectImageShell : "",
                        isGym ? styles.gymProjectImageShell : "",
                      ].join(" ")}
                    >
                      {isAntrianku ? (
                        <AntriankuSinglePhoneMockup
                          mainImage={projectImage || "/antrianku/2.jpeg"}
                        />
                      ) : isRoyal ? (
                        <div className={styles.royalHighlightHero}>
                          <div className={styles.royalHeroGrid} />
                          <div className={styles.royalHeroGlowOne} />
                          <div className={styles.royalHeroGlowTwo} />

                          <div className={styles.royalHeroText}>
                            <strong>Mobile Healthcare App</strong>
                            <small>Booking dokter · EMR · Radiologi</small>
                          </div>

                          <div className={styles.royalMiniPhone}>
                            <div className={styles.royalMiniNotch} />
                            <img
                              src="/royal/showcase/beranda.png"
                              alt="Royal Klinik Beranda"
                            />
                          </div>
                        </div>
                      ) : isHomecare ? (
                        <HomecareSinglePhoneMockup
                          mainImage={project.imageUrl || "/homecare/homecare1.png"}
                        />
                      ) : isGym ? (
                        <GymSinglePhoneMockup
                          mainImage={projectImage || "/gym/1.png"}
                        />
                      ) : (
                        <>
                          <div className={styles.projectHighlightFallback}>
                            <div className={styles.highlightGrid} />
                            <div className={styles.highlightGlowOne} />
                            <div className={styles.highlightGlowTwo} />

                            <div className={styles.highlightBadge}>
                              {projectInitial}
                            </div>

                            <div className={styles.highlightContent}>
                              <span>{project.category}</span>
                              <strong>{project.title}</strong>
                              <small>Project Showcase</small>
                            </div>
                          </div>

                          {projectImage && !imageFailed ? (
                            <img
                              src={projectImage}
                              alt={project.title}
                              className={[
                                "project-image",
                                "royal-project-image",
                                styles.projectImage,
                              ].join(" ")}
                              onError={() => {
                                setFailedImages((current) => ({
                                  ...current,
                                  [project.title]: true,
                                }));
                              }}
                            />
                          ) : null}
                        </>
                      )}

                      {!isHomecare && !isGym && !isRoyal && !isAntrianku ? (
                        <>
                          <div className="project-image-overlay" />
                          <span>{project.category}</span>
                        </>
                      ) : null}
                    </div>

                    <div className="project-content">
                      <h3>{project.title}</h3>

                      <p>{project.description}</p>

                      <div className="project-tech">
                        {project.tech.map((item) => (
                          <span key={item}>{item}</span>
                        ))}
                      </div>

                      <div className="project-actions">
                        <button
                          type="button"
                          className={styles.viewProjectButton}
                          onClick={(event) => {
                            event.stopPropagation();
                            openShowcase(project.index);
                          }}
                        >
                          {t.btnView}
                          <ArrowRight size={16} />
                        </button>

                        <button
                          type="button"
                          className={styles.projectIconButton}
                          aria-label={lang === "id" ? "Lihat showcase project" : "View project showcase"}
                          onClick={(event) => {
                            event.stopPropagation();
                            openShowcase(project.index);
                          }}
                        >
                          <ExternalLink size={18} />
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            <button
              type="button"
              onClick={goNext}
              aria-label={lang === "id" ? "Project berikutnya" : "Next project"}
              className={`${styles.sideArrowButton} ${styles.sideArrowRight}`}
            >
              <ArrowRight size={22} />
            </button>
          </div>

          <div
            className={styles.projectSliderDots}
            aria-label="Project indicator"
          >
            {localizedProjects.map((project, index) => (
              <button
                key={project.title}
                type="button"
                className={index === activeIndex ? styles.isActiveDot : ""}
                onClick={() => selectProject(index)}
                aria-label={lang === "id" ? `Lihat ${project.title}` : `View ${project.title}`}
              />
            ))}
          </div>
        </div>
      </section>

      {isDokterProject(activeProject) ? (
        <ProjectShowcaseDokter
          open={showcaseOpen}
          project={activeProject}
          onClose={() => setShowcaseOpen(false)}
        />
      ) : isHomecareProject(activeProject) ? (
        <ProjectShowcaseHomecare
          open={showcaseOpen}
          project={activeProject}
          onClose={() => setShowcaseOpen(false)}
        />
      ) : isGymProject(activeProject) ? (
        <ProjectShowcaseGYM
          open={showcaseOpen}
          project={activeProject}
          onClose={() => setShowcaseOpen(false)}
        />
      ) : isAntriankuProject(activeProject) ? (
        <ProjectShowcaseAntrianku
          open={showcaseOpen}
          project={activeProject}
          onClose={() => setShowcaseOpen(false)}
        />
      ) : (
        <ProjectShowcaseModal
          open={showcaseOpen}
          project={activeProject}
          onClose={() => setShowcaseOpen(false)}
        />
      )}
    </>
  );
}

function HomecareSinglePhoneMockup({ mainImage }: { mainImage: string }) {
  const { lang } = useLanguage();
  return (
    <div className={styles.homecareRoyalHero}>
      <div className={styles.homecareRoyalGrid} />
      <div className={styles.homecareRoyalGlowOne} />
      <div className={styles.homecareRoyalGlowTwo} />

      <div className={styles.homecareRoyalText}>
        <strong>
          Home Care
          <br />
          Mobile App
        </strong>
        <small>{lang === "id" ? "Booking layanan · Jadwal · Admin care" : "Service booking · Schedule · Admin care"}</small>
      </div>

      <div className={styles.homecareRoyalBadge}>Mobile Homecare App</div>

      <div className={styles.homecareRoyalPhone}>
        <div className={styles.homecareRoyalNotch} />
        <img src={mainImage} alt="Prima Homecare mobile app screen" />
      </div>
    </div>
  );
}

function GymSinglePhoneMockup({ mainImage }: { mainImage: string }) {
  const { lang } = useLanguage();
  return (
    <div className={styles.gymHero}>
      <div className={styles.gymGrid} />
      <div className={styles.gymGlowOne} />
      <div className={styles.gymGlowTwo} />

      <div className={styles.gymPlateStack}>
        <span />
        <span />
        <span />
        <span />
      </div>

      <div className={styles.gymHeroText}>
        <small>Prima Fitness Club</small>
        <strong>
          Gym Management
          <br />
          Mobile App
        </strong>
        <p className={styles.gymSubText}>
          {lang === "id" ? "Member · Trainer · Sales · Kasir" : "Member · Trainer · Sales · Cashier"}
        </p>
      </div>

      <div className={styles.gymMiniChip}>Fitness App</div>

      <div className={styles.gymPhone}>
        <div className={styles.gymPhoneNotch} />
        <img src={mainImage} alt="Prima Fitness Club mobile app screen" />
      </div>
    </div>
  );
}

function AntriankuSinglePhoneMockup({ mainImage }: { mainImage: string }) {
  const { lang } = useLanguage();
  return (
    <div className={styles.antriankuHero}>
      <div className={styles.gymGrid} />
      <div className={styles.antriankuGlowOne} />
      <div className={styles.antriankuGlowTwo} />

      <div className={styles.antriankuHeroText}>
        <small>Queue Management</small>
        <strong>
          Antrianku
          <br />
          Mobile App
        </strong>
        <p className={styles.antriankuSubText}>
          {lang === "id" ? "Booking · Layanan · Notifikasi" : "Booking · Services · Notifications"}
        </p>
      </div>

      <div className={styles.antriankuMiniChip}>Queue App</div>

      <div className={styles.gymPhone}>
        <div className={styles.gymPhoneNotch} />
        <img src={mainImage} alt="Antrianku mobile app screen" />
      </div>
    </div>
  );
}