'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { CONTACT_EMAIL, IMAGE_COPYRIGHT } from '@/lib/site';
import type { Project } from '@/lib/types';

interface Props {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
}

const INFO_FIELDS: { key: keyof Project; label: string }[] = [
  { key: 'location', label: 'Location' },
  { key: 'completedYear', label: 'Completed' },
  { key: 'size', label: 'Size' },
  { key: 'photography', label: 'Photography' }
];

const PANEL_TRANSITION = { duration: 0.35, ease: [0.25, 0, 0, 1] } as const;
const LABEL_CLOSE_INFO = '[−] Info';

export default function ProjectInfoPanel({ project, isOpen, onClose }: Props) {
  const activeFields = INFO_FIELDS.filter(({ key }) => !!project[key]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.35 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-66 bg-black"
            onClick={onClose}
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={PANEL_TRANSITION}
            className="fixed right-0 z-67 w-full md:w-[45vw] md:min-w-80 bg-navy text-white flex flex-col pl-12 pr-9"
            style={{
              top: -120,
              bottom: -120,
              paddingTop: 'calc(120px + env(safe-area-inset-top, 0px) + 28px)',
              paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 28px)'
            }}
          >
            {/* Mirrors NavBar 2-row structure: row1 spacer (h-3) + gap-3 + row2 (h-7) */}
            <div className="flex flex-col gap-3 shrink-0">
              <div className="h-3" />
              <div className="h-7 flex justify-end items-end">
                <button
                  onClick={onClose}
                  className="uppercase tracking-widest text-xs text-white cursor-pointer hover:opacity-70 transition-opacity p-0 m-0 border-0 bg-transparent appearance-none leading-3 font-apercu"
                >
                  {LABEL_CLOSE_INFO}
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto overflow-x-hidden">
              <div className="flex flex-col mt-[7.5vh] gap-2">
                {activeFields.map(({ key, label }) => (
                  <div key={key} className="flex flex-row gap-6 items-center">
                    <span className="shrink-0 uppercase tracking-widest text-xs min-w-28 lg:min-w-35 font-apercu">
                      {label}:
                    </span>
                    <span className="font-light text-base leading-5">
                      {project[key] as string}
                    </span>
                  </div>
                ))}

                {project.press && project.press.length > 0 && (
                  <div className="flex flex-row gap-6 items-start">
                    <span className="shrink-0 uppercase tracking-widest text-xs min-w-28 lg:min-w-35 font-apercu pt-0.5">
                      Press:
                    </span>
                    <p className="font-light text-base leading-5">
                      {project.press.map((item, i) => (
                        <span key={item.id}>
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:opacity-70 transition-opacity"
                          >
                            {item.name}
                          </a>
                          {i < project.press!.length - 1 && ', '}
                        </span>
                      ))}
                    </p>
                  </div>
                )}

                {project.description && (
                  <div className="flex gap-6 mt-30">
                    <span className="hidden lg:block shrink-0 min-w-35" />
                    <p className="font-light text-[14px] lg:text-base leading-5.5 lg:max-w-[70%]">
                      {project.description}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <p className="uppercase tracking-widest shrink-0 text-[10px] leading-4 font-apercu">
              {IMAGE_COPYRIGHT}{' '}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="underline underline-offset-2 hover:opacity-70 transition-opacity"
              >
                {CONTACT_EMAIL}
              </a>
            </p>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
