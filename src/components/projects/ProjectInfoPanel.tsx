'use client';

import { motion, AnimatePresence } from 'framer-motion';
import type { Project } from '@/lib/types';

interface Props {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
}

const INFO_FIELDS: { key: keyof Project; label: string }[] = [
  { key: 'location',      label: 'Location'     },
  { key: 'completedYear', label: 'Completed'     },
  { key: 'size',          label: 'Size'          },
  { key: 'photography',   label: 'Photography'   },
  { key: 'press',         label: 'Press'         },
];

const FONT = { fontFamily: 'var(--font-cormorant), serif' };

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
            className="fixed inset-0 z-[66] bg-black"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.35, ease: [0.25, 0, 0, 1] }}
            className="fixed top-0 right-0 bottom-0 z-[67] w-[45vw] min-w-[320px] bg-[#13136B] flex flex-col"
            style={{ paddingLeft: 48, paddingRight: 36, paddingTop: 28, paddingBottom: 28 }}
          >
            {/* ── Zona 1: top bar (fija, no scrollea) ── */}
            <div className="flex items-center justify-end shrink-0">
              <button
                onClick={onClose}
                className="uppercase tracking-widest cursor-pointer hover:opacity-70 transition-opacity"
                style={{ ...FONT, fontSize: 12, color: 'white' }}
              >
                [−] Info
              </button>
            </div>

            {/* ── Zona 2: contenido central (scrolleable si desborda) ── */}
            <div className="flex-1 overflow-y-auto">
              {/* Campos */}
              <div className="flex flex-col" style={{ marginTop: '22vh', gap: 8 }}>
                {activeFields.map(({ key, label }) => (
                  <div key={key} className="flex gap-6">
                    <span
                      className="shrink-0 uppercase tracking-widest"
                      style={{ ...FONT, fontSize: 12, color: 'white', minWidth: 140 }}
                    >
                      {label}:
                    </span>
                    <span
                      className="font-light"
                      style={{ ...FONT, fontSize: 16, color: 'white', lineHeight: '20px' }}
                    >
                      {project[key] as string}
                    </span>
                  </div>
                ))}
              </div>

              {/* Descripción */}
              {project.description && (
                <p
                  className="font-light"
                  style={{ ...FONT, fontSize: 16, color: 'white', lineHeight: '22px', marginTop: 48 }}
                >
                  {project.description}
                </p>
              )}
            </div>

            {/* ── Zona 3: copyright (fijo al fondo, mismo margen que arriba) ── */}
            <p
              className="uppercase tracking-widest shrink-0"
              style={{ ...FONT, fontSize: 10, color: 'white', lineHeight: '16px' }}
            >
              All the images are protected by the author.{' '}
              If you want to use the images please contact{' '}
              <a
                href="mailto:info@bynost.com"
                className="underline underline-offset-2 hover:opacity-70 transition-opacity"
              >
                info@bynost.com
              </a>
            </p>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
