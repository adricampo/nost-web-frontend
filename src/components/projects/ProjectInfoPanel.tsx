'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { CONTACT_EMAIL } from '@/lib/site';
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
  { key: 'photography', label: 'Photography' },
  { key: 'press', label: 'Press' }
];

const PANEL_TRANSITION = { duration: 0.35, ease: [0.25, 0, 0, 1] } as const;

export default function ProjectInfoPanel({ project, isOpen, onClose }: Props) {
  const activeFields = INFO_FIELDS.filter(({ key }) => !!project[key]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.35 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-66 bg-black"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={PANEL_TRANSITION}
            className="fixed top-0 right-0 bottom-0 z-67 w-[45vw] min-w-[320px] bg-navy text-white flex flex-col pl-12 pr-9 pt-7 pb-7"
          >
            {/* Top bar */}
            <div className="flex items-center justify-end shrink-0">
              <button
                onClick={onClose}
                className="uppercase tracking-widest text-xs cursor-pointer hover:opacity-70 transition-opacity p-0 m-0 border-0 bg-transparent appearance-none leading-3"
              >
                [−] Info
              </button>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto">
              <div className="flex flex-col mt-[22vh] gap-2">
                {activeFields.map(({ key, label }) => (
                  <div key={key} className="flex gap-6">
                    <span className="shrink-0 uppercase tracking-widest text-xs min-w-35">
                      {label}:
                    </span>
                    <span className="font-light text-base leading-5">
                      {project[key] as string}
                    </span>
                  </div>
                ))}
              </div>

              {project.description && (
                <p className="font-light text-base leading-5.5 mt-12">
                  {project.description}
                </p>
              )}
            </div>

            {/* Copyright — fixed at bottom */}
            <p className="uppercase tracking-widest shrink-0 text-[10px] leading-4">
              All the images are protected by the author. If you want to use the
              images please contact{' '}
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
