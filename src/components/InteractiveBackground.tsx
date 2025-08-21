import * as React from "react"
import { useEffect, useRef } from "react"

// A global ID counter so particles have stable IDs
let nextParticleId = 0

export default function InteractiveBackground() {
    // Canvas ref
    const canvasRef = useRef<HTMLCanvasElement>(null)

    // Particle + mouse + line states
    const particlesRef = useRef<Particle[]>([])
    const mouseRef = useRef({ x: -1000, y: -1000 })
    const lineStateRef = useRef<{ [key: string]: LineState }>({})

    // Store locked dimensions in refs
    const lockedWidth = useRef(0)
    const lockedHeight = useRef(0)

// Animation + fade durations
const fadeInDuration = 500
const fadeOutDuration = 500
const POP_DURATION = 350

// Rendering toggles
const DRAW_CIRCLES = false

// Scroll velocity constraints
const MAX_VELOCITY = 1
const MAX_SCROLL_FRACTION = 0.5
const MAX_SCROLL_VY = MAX_VELOCITY * MAX_SCROLL_FRACTION

    // Particle + line interfaces
    interface Particle {
        id: number
        x: number
        y: number
        vx: number
        vy: number
        size: number
        color: string
        scrollFactor: number
        wentOutOfBoundsThisFrame?: boolean

        isPopping?: boolean
        popStartTime?: number
        popInitialSize?: number
    }

    interface LineState {
        birthTime?: number
        removalTime?: number
        geometry?: LineGeometry
        wasDrawnLastFrame?: boolean
        finalFadeOut?: boolean
    }

    interface LineGeometry {
        x1: number
        y1: number
        x2: number
        y2: number
        cp1x: number
        cp1y: number
        cp2x: number
        cp2y: number
    }

    // 1) Initialize the canvas *once*, locking its width/height.
    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        // Lock to the browser's width & height on mount
        lockedWidth.current = window.innerWidth
        lockedHeight.current = window.innerHeight

        // Multiply by devicePixelRatio for crispness
        const pixelRatio = window.devicePixelRatio || 1
        canvas.width = lockedWidth.current * pixelRatio
        canvas.height = lockedHeight.current * pixelRatio

        // Scale the drawing context
        const ctx = canvas.getContext("2d")
        if (ctx) {
            ctx.scale(pixelRatio, pixelRatio)
        }
    }, [])

    // 2) Initialize particles (once), then start animation
    useEffect(() => {
        initParticles()
        animateParticles()
    }, [])

    // Particle creation
    const initParticles = () => {
        if (!canvasRef.current) return

        // We'll spawn them randomly across the *locked* dimensions
        const width = lockedWidth.current
        const height = lockedHeight.current
        const particles: Particle[] = []

        let numParticles = 100
        const screenWidth = window.innerWidth
        if (screenWidth <= 480) {
            numParticles = 50
        } else if (screenWidth > 1024) {
            numParticles = 200
        }

        for (let i = 0; i < numParticles; i++) {
            const initialX = Math.random() * width
            const initialY = Math.random() * height
            particles.push({
                id: nextParticleId++,
                x: initialX,
                y: initialY,
                vx: (Math.random() - 0.5) * 0.2,
                vy: (Math.random() - 0.5) * 0.2,
                size: Math.random() * 2 + 1,
                color: "rgba(255, 215, 0, 0.8)",
                scrollFactor: Math.random() * 0.3 + 0.85,
            })
        }
        particlesRef.current = particles
    }

    // 3) Core animation loop
    const animateParticles = () => {
        const now = performance.now()
        if (!canvasRef.current) return
        const ctx = canvasRef.current.getContext("2d")
        if (!ctx) return

        // Use our locked dimensions for everything
        const width = lockedWidth.current
        const height = lockedHeight.current
        const offscreenMargin = 50

        // Clear
        ctx.clearRect(0, 0, width, height)

        // Update + draw each particle
        for (const particle of particlesRef.current) {
            //  -- Popping logic --
            if (particle.isPopping && particle.popStartTime !== undefined) {
                const elapsed = now - particle.popStartTime
                const t = elapsed / POP_DURATION
                if (t <= 1) {
                    const scale = 1 + 1.5 * t
                    const alpha = 1 - t
                    const baseSize = particle.popInitialSize ?? particle.size
                    const mainRadius = baseSize * scale

                    if (DRAW_CIRCLES) {
                        // main pop
                        ctx.beginPath()
                        ctx.arc(particle.x, particle.y, mainRadius, 0, Math.PI * 2)
                        ctx.fillStyle = `rgba(255, 215, 0, ${alpha})`
                        ctx.fill()

                        // ring
                        const ringOffset = baseSize * 2 * t
                        const ringRadius = mainRadius + ringOffset
                        const ringAlpha = 0.5 * (1 - t)
                        ctx.beginPath()
                        ctx.arc(particle.x, particle.y, ringRadius, 0, Math.PI * 2)
                        ctx.strokeStyle = `rgba(255, 255, 255, ${ringAlpha})`
                        ctx.lineWidth = 1 + 2 * (1 - t)
                        ctx.stroke()
                    } else {
                        // No circle visuals; simply mark for removal
                        particle.wentOutOfBoundsThisFrame = true
                    }
                } else {
                    // done popping -> mark for removal
                    particle.wentOutOfBoundsThisFrame = true
                }
                // skip normal movement for popped
                continue
            }

            //  -- Normal movement --
            particle.x += particle.vx
            particle.y += particle.vy

            // friction
            particle.vx *= 0.99
            particle.vy *= 0.99

            // random "jitter"
            const acceleration = 0.02
            particle.vx += (Math.random() - 0.5) * acceleration
            particle.vy += (Math.random() - 0.5) * acceleration * 0.5

            // horizontal bounce
            if (particle.x <= 0 || particle.x >= width) {
                particle.vx *= -1
            }

            // top/bottom wrap
            if (particle.y < -offscreenMargin) {
                // re-enter from bottom
                particle.y = height + offscreenMargin
                particle.x = Math.random() * width
                particle.vy = (Math.random() - 0.5) * 0.2
                particle.vx = (Math.random() - 0.5) * 0.2
            } else if (particle.y > height + offscreenMargin) {
                // re-enter from top
                particle.y = -offscreenMargin
                particle.x = Math.random() * width
                particle.vy = (Math.random() - 0.5) * 0.2
                particle.vx = (Math.random() - 0.5) * 0.2
            }

            // Cursor repulsion
            const dx = particle.x - mouseRef.current.x
            const dy = particle.y - mouseRef.current.y
            const dist = Math.sqrt(dx * dx + dy * dy)
            const interactionRadius = 28
            if (dist < interactionRadius) {
                const angle = Math.atan2(dy, dx)
                const force = (interactionRadius - dist) / interactionRadius
                const cursorForce = 0.1
                particle.vx += Math.cos(angle) * force * cursorForce
                particle.vy += Math.sin(angle) * force * cursorForce
            }

            if (DRAW_CIRCLES) {
                // Draw dot
                ctx.beginPath()
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
                ctx.fillStyle = particle.color
                ctx.fill()
            }
        }

        //  -- Lines --
        const visibleLines = new Set<string>()
        for (let i = 0; i < particlesRef.current.length; i++) {
            const p1 = particlesRef.current[i]
            if (p1.wentOutOfBoundsThisFrame || p1.isPopping) continue

            for (let j = i + 1; j < particlesRef.current.length; j++) {
                const p2 = particlesRef.current[j]
                if (p2.wentOutOfBoundsThisFrame || p2.isPopping) continue

                // Stable line ID
                const lineIdA = p1.id < p2.id ? p1.id : p2.id
                const lineIdB = p1.id < p2.id ? p2.id : p1.id
                const lineKey = `${lineIdA}-${lineIdB}`
                let lineState = lineStateRef.current[lineKey]

                // Distance threshold
                const dx = p1.x - p2.x
                const dy = p1.y - p2.y
                const dist = Math.sqrt(dx * dx + dy * dy)

                if (dist < 150) {
                    // visible line
                    if (lineState?.finalFadeOut) {
                        continue
                    }
                    visibleLines.add(lineKey)

                    if (!lineState) {
                        lineState = lineStateRef.current[lineKey] = {}
                    }
                    if (lineState.removalTime) {
                        // it was fading, now reappears
                        delete lineState.removalTime
                        delete lineState.geometry
                        delete lineState.finalFadeOut
                        lineState.birthTime = now
                    } else if (!lineState.birthTime) {
                        lineState.birthTime = now
                    }

                    let alpha = 1
                    if (lineState.birthTime && !lineState.removalTime) {
                        const elapsed = now - lineState.birthTime
                        alpha = Math.min(1, elapsed / fadeInDuration)
                    }

                    // curved line
                    const cp1x = p1.x + p1.vx * 10
                    const cp1y = p1.y + p1.vy * 10
                    const cp2x = p2.x - p2.vx * 10
                    const cp2y = p2.y - p2.vy * 10

                    const lineAlpha = (1 - dist / 150) * 0.8 * alpha
                    ctx.strokeStyle = `rgba(255, 215, 0, ${lineAlpha})`
                    ctx.lineWidth = 1
                    ctx.beginPath()
                    ctx.moveTo(p1.x, p1.y)
                    ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, p2.x, p2.y)
                    ctx.stroke()

                    if (!lineState.removalTime) {
                        lineState.geometry = {
                            x1: p1.x,
                            y1: p1.y,
                            x2: p2.x,
                            y2: p2.y,
                            cp1x,
                            cp1y,
                            cp2x,
                            cp2y,
                        }
                        lineState.wasDrawnLastFrame = true
                    }
                } else {
                    // not visible
                    if (lineState && !lineState.removalTime) {
                        const outOfBoundsTriggered =
                            p1.wentOutOfBoundsThisFrame ||
                            p2.wentOutOfBoundsThisFrame
                        if (
                            outOfBoundsTriggered &&
                            lineState.geometry &&
                            lineState.wasDrawnLastFrame
                        ) {
                            // fade out
                            lineState.removalTime = now
                            lineState.finalFadeOut = true
                        } else {
                            delete lineStateRef.current[lineKey]
                        }
                    }
                }
            }
        }

        //  -- Fade-out lines --
        for (const lineKey in lineStateRef.current) {
            const lineState = lineStateRef.current[lineKey]
            if (lineState.removalTime && !visibleLines.has(lineKey)) {
                const elapsed = performance.now() - lineState.removalTime
                const alpha = Math.max(0, 1 - elapsed / fadeOutDuration)
                if (alpha > 0 && lineState.geometry) {
                    const g = lineState.geometry
                    const lineAlpha = 0.8 * alpha
                    ctx.strokeStyle = `rgba(255, 215, 0, ${lineAlpha})`
                    ctx.lineWidth = 1
                    ctx.beginPath()
                    ctx.moveTo(g.x1, g.y1)
                    ctx.bezierCurveTo(
                        g.cp1x,
                        g.cp1y,
                        g.cp2x,
                        g.cp2y,
                        g.x2,
                        g.y2
                    )
                    ctx.stroke()
                } else {
                    delete lineStateRef.current[lineKey]
                }
            } else if (visibleLines.has(lineKey)) {
                const ls = lineStateRef.current[lineKey]
                if (ls) ls.wasDrawnLastFrame = true
            }
        }

        // Remove only those that finished popping
        particlesRef.current = particlesRef.current.filter(
            (p) => !p.wentOutOfBoundsThisFrame
        )

        // Loop
        requestAnimationFrame(animateParticles)
    }

    // 4) Mouse & touch move => update mouseRef
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current.x = e.clientX
            mouseRef.current.y = e.clientY
        }
        const handleTouchMove = (e: TouchEvent) => {
            if (e.touches.length > 0) {
                mouseRef.current.x = e.touches[0].clientX
                mouseRef.current.y = e.touches[0].clientY
            }
        }

        window.addEventListener("mousemove", handleMouseMove)
        window.addEventListener("touchmove", handleTouchMove)
        return () => {
            window.removeEventListener("mousemove", handleMouseMove)
            window.removeEventListener("touchmove", handleTouchMove)
        }
    }, [])

    // 5) Click => pop
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            const clickX = e.clientX
            const clickY = e.clientY
            const BASE_RADIUS = 8

            for (const particle of particlesRef.current) {
                if (particle.isPopping) continue

                const dx = particle.x - clickX
                const dy = particle.y - clickY
                const dist = Math.sqrt(dx * dx + dy * dy)
                const clickableRadius = BASE_RADIUS + 1.5 * particle.size

                if (dist < clickableRadius) {
                    particle.isPopping = true
                    particle.popStartTime = performance.now()
                    particle.popInitialSize = particle.size
                    // break if you only want 1 pop per click
                }
            }
        }

        window.addEventListener("click", handleClick)
        return () => {
            window.removeEventListener("click", handleClick)
        }
    }, [])

    // 6) Scroll => modify vy
    useEffect(() => {
        let lastScrollTop =
            window.pageYOffset || document.documentElement.scrollTop

        const handleScroll = () => {
            const scrollTop =
                window.pageYOffset || document.documentElement.scrollTop
            const delta = scrollTop - lastScrollTop

            // Slight effect on vy
            const scrollEffect = delta * 0.001
            particlesRef.current.forEach((particle) => {
                particle.vy -= scrollEffect * particle.scrollFactor
                if (particle.vy > MAX_SCROLL_VY) {
                    particle.vy = MAX_SCROLL_VY
                } else if (particle.vy < -MAX_SCROLL_VY) {
                    particle.vy = -MAX_SCROLL_VY
                }
            })

            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop
        }

        // We add a scroll listener, but *no* window.resize
        window.addEventListener("scroll", handleScroll)
        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            style={{
                display: "block",
                position: "fixed",
                top: 0,
                left: 0,
                // Lock the canvas to fill the screen at load time
                width: "100%",
                height: "100%",
                zIndex: 0,
                pointerEvents: "none",
            }}
        />
    )
}