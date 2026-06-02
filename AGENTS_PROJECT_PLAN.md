# Ozzy's Excavation Project Plan

This file is the shared project checklist for AI/human agents working on this repo. Keep it updated as work is completed, deferred, blocked, or changed.

## Agent Rules

- Repo path: `/Users/darren_dean/ozzys-excavation`
- Current safe baseline on `main`: `b574d32 fix: complete septic assessment submit flow`
- Active working branch for mobile/responsive experiments: `mobile/responsive-optimization`
- Do not push to GitHub unless Darren explicitly asks.
- Do not access Cloudflare or Wrangler. GitHub push triggers deployment when Darren approves.
- Before changing source, run:
  - `git branch --show-current`
  - `git status --short`
- Edit React/TypeScript source files with targeted patches only. Do not use broad Python regex rewrites on `.tsx` / `.ts` source.
- After any change, run `npm run build`.
- Keep the local dev server available for physical phone testing when requested:
  - `npm run dev -- --host 0.0.0.0 --port 5173`
  - Tailscale URL used this session: `http://100.105.36.33:5173`
- If a mobile change risks desktop layout, isolate it behind mobile-only components/classes instead of altering shared desktop markup.
- Desktop must remain visually unchanged unless Darren explicitly approves desktop changes.

## Current State

Branch: `mobile/responsive-optimization`

Recent state notes:
- Phase 1 mobile/responsive optimization is complete and ready to merge to `main`.
- Desktop navbar and hero remain isolated in desktop-only components.
- Mobile navbar and hero are isolated in mobile-only components.
- Quote form mobile overflow has been fixed with full-width/min-width safeguards and mobile padding.
- Quote form now shows a local mock submission confirmation and resets automatically; it still does not send real email/webhooks.
- Phone links use real E.164 `tel:` targets in source.
- ElevenLabs agent has been rebranded externally to Ozzy's Excavation Services with the orange O avatar.

Validation completed:
- `npm run build` passed after Phase 1 changes.
- Browser overflow check confirmed no horizontal overflow at 390px viewport width.
- ElevenLabs API verification returned no old TerraCore branding references in returned agent JSON.

## Completed / Stable Features

- Phone links should use E.164 `tel:+1...` format.
- Assessment form must not send real email/webhooks yet.
- Septic assessment submit flow shows completion state and uses local/console-only draft behavior.
- Required form gating exists across assessment steps.
- GitHub `main` is the production/stable branch.

## Mobile Work Strategy

Use same repo, separate branch.

Do not create a new repo.

Use this safer approach after failed shared-layout edits:
- Keep current desktop navbar/hero intact.
- Create separate mobile-only components for risky areas.
- Render mobile components with `md:hidden` or `lg:hidden`.
- Render desktop components with `hidden md:block` or `hidden lg:block`.
- Do not refactor desktop markup and mobile markup at the same time.
- Each phase requires human checkpoint before continuing.

## Phase Checklist

### Phase 0 — Project Plan / Agent Handoff

Status: COMPLETE

Tasks:
- [x] Create this shared project plan file.
- [x] Update plan with completed Phase 1 mobile/responsive work.
- [x] Commit mobile branch when Darren approves.
- [x] Push branch and merge to `main` when Darren approves.

### Phase 1 — Safe Mobile/Desktop Component Split

Status: COMPLETE

Goal:
- Separate risky mobile changes from stable desktop rendering.

Tasks:
- [x] Extract current working `Navbar` into `DesktopNavbar` without visual changes.
- [x] Add minimal `MobileNavbar` rendered only on mobile.
- [x] Extract current hero into `DesktopHero` without visual changes.
- [x] Add minimal `MobileHero` rendered only on mobile.
- [x] Fix mobile quote form overflow with full-width/min-width guards and smaller mobile padding.
- [x] Add local quote submission confirmation and automatic reset behavior.
- [x] Preserve septic scope redirect to `/septic-assessment-form`.
- [x] Run `npm run build`.
- [x] Verify 390px viewport has no horizontal overflow.
- [x] Commit after approval.

Acceptance:
- [x] Desktop navbar and hero look unchanged structurally by preserving desktop-only markup.
- [x] Mobile has isolated mobile-only navbar/hero.
- [x] No horizontal wandering at 390px viewport verification.

### Phase 2 — Mobile Hero Only

Status: NOT STARTED

Tasks:
- [ ] Hide large white desktop logo box in `MobileHero` only.
- [ ] Use smaller mobile headline.
- [ ] Stack mobile CTA buttons full width.
- [ ] Preserve desktop hero exactly.
- [ ] Build and human checkpoint.

### Phase 3 — Mobile Navbar Only

Status: NOT STARTED

Tasks:
- [ ] Keep mobile header compact.
- [ ] Include tappable Call button.
- [ ] Include Quote / Form path.
- [ ] Decide with Darren whether mobile needs hamburger menu or just CTA buttons.
- [ ] Preserve desktop navbar exactly.
- [ ] Build and human checkpoint.

### Phase 4 — Mobile Quote Form

Status: NOT STARTED

Tasks:
- [ ] Ensure fields are full-width and readable on phones.
- [ ] Ensure buttons are full-width/tappable on phones.
- [ ] Ensure form still does not send real email/webhook unless explicitly approved later.
- [ ] Build and human checkpoint.

### Phase 5 — Mobile Septic Assessment Form

Status: NOT STARTED

Tasks:
- [ ] Improve assessment step buttons for mobile.
- [ ] Consider mobile progress indicator instead of six cramped step pills.
- [ ] Ensure required gating still works.
- [ ] Ensure Verify & Submit still shows completed message.
- [ ] Ensure assessment still does not send real email/webhook.
- [ ] Build and human checkpoint.

### Phase 6 — Mobile Section / Footer / Widget Polish

Status: NOT STARTED

Tasks:
- [ ] Check About section image/text layout.
- [ ] Check Services cards.
- [ ] Check Service Areas section.
- [ ] Check footer.
- [ ] Check ElevenLabs widget does not cover important mobile CTAs.
- [ ] Build and human checkpoint.

## Known Pitfalls

- Previous mobile attempts changed shared navbar/hero classes and broke desktop: logo took too much screen and menu items were pushed together.
- Do not apply broad global CSS containment without checking desktop. It may affect desktop rendering.
- Avoid changing desktop classes unless explicitly required.
- `npm run build` regenerates `src/data/content.ts`; include it in commits only if it changes.

## Verification Commands

```bash
git branch --show-current
git status --short
npm run build
npm run dev -- --host 0.0.0.0 --port 5173
curl -sI http://127.0.0.1:5173 | head -n 1
```

## Commit Guidance

Suggested next commit after approval:

```bash
git add AGENTS_PROJECT_PLAN.md src/App.tsx src/data/content.ts
git commit -m "docs: add shared project plan and update assessment acknowledgement"
```

Do not push unless Darren explicitly says to push.
