import { motion, useTransform } from "framer-motion";
import { Sprout } from "lucide-react";

const EASE_SPRING = { type: "spring", stiffness: 38, damping: 13, mass: 1.1 };

/**
 * A tilted, full-bleed editorial story card. Three nested layers keep the
 * animations from fighting each other:
 *  1. outer  -> mouse parallax (x/y driven by shared spring motion values)
 *  2. middle -> one-time entrance (fly in + 3D tilt + scale)
 *  3. inner  -> continuous float/wobble loop + hover response
 */
export default function FloatingCard({
  data,
  rotate = 0,
  depth = 0,
  floatDuration = 6,
  floatDelay = 0,
  driftX = 0,
  entranceDelay = 0,
  entranceFrom = { x: 0, y: 0 },
  springX,
  springY,
  reduce,
  mobile = false,
}) {
  const parX = useTransform(springX, (v) => v * depth);
  const parY = useTransform(springY, (v) => v * depth);

  return (
    <motion.div style={mobile ? undefined : { x: parX, y: parY }}>
      <motion.div
        initial={
          reduce
            ? false
            : {
                opacity: 0,
                scale: 0.7,
                x: entranceFrom.x,
                y: entranceFrom.y,
                rotateX: 18,
                rotateY: entranceFrom.x < 0 ? -22 : 22,
              }
        }
        animate={{ opacity: 1, scale: 1, x: 0, y: 0, rotateX: 0, rotateY: 0 }}
        transition={{ ...EASE_SPRING, delay: reduce ? 0 : entranceDelay }}
        style={{ perspective: 800 }}
      >
        <motion.div
          className={`group relative block aspect-square overflow-hidden rounded-full border-[5px] border-white bg-[#271719] shadow-[0_20px_40px_-16px_rgba(34,34,34,0.4)] transition-shadow duration-300 hover:shadow-[0_24px_48px_-12px_rgba(128,24,33,0.5)] ${
            mobile ? "w-[150px] shrink-0 snap-center" : "w-[150px] md:w-[180px] lg:w-[220px]"
          }`}
          animate={
            reduce || mobile
              ? undefined
              : {
                  y: [0, -10, 0],
                  x: [0, driftX, 0],
                  rotate: [rotate - 1.2, rotate + 1.2, rotate - 1.2],
                }
          }
          transition={
            reduce || mobile
              ? undefined
              : { duration: floatDuration, delay: floatDelay, repeat: Infinity, ease: "easeInOut" }
          }
          whileHover={
            reduce
              ? undefined
              : { rotate: 0, scale: 1.05, y: -6, transition: { duration: 0.35, ease: "easeOut" } }
          }
          style={!mobile && !reduce ? undefined : { rotate: mobile ? 0 : rotate }}
        >
          {/* Full-cover image (or brand-tone placeholder) */}
          {data.image ? (
            <img
              src={data.image}
              alt={data.alt}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#801821] via-[#5c1019] to-[#271719] transition-transform duration-700 group-hover:scale-110">
              <Sprout className="h-12 w-12 text-white/20" strokeWidth={1.25} />
            </div>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
