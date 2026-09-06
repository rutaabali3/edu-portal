# CONTRIBUTING TO EDUWEB

Thank you for your interest in contributing to EduWeb. We welcome contributions from developers, educators, designers, and researchers.

Please review this document carefully to ensure your contributions align with the platform architecture, coding standards, and quality guidelines.

---

## TABLE OF CONTENTS

1. [Code of Conduct](#code-of-conduct)
2. [How to Contribute](#how-to-Contribute)
3. [Development Environment Setup](#development-environment-setup)
4. [Sub-Portal Architecture Guidelines](#sub-portal-architecture-guidelines)
5. [Coding & Design Standards](#coding--design-standards)
6. [Validation & Testing](#validation--testing)
7. [Submitting a Pull Request](#submitting-a-pull-request)

---

## CODE OF CONDUCT

We are committed to providing a welcoming, inclusive, and harassment-free environment for everyone. Contributors are expected to uphold professional and respectful communication in all issues, pull requests, and discussions.

---

## HOW TO CONTRIBUTE

There are several ways you can contribute to EduWeb:

- **Reporting Bugs**: Submit a detailed issue describing the bug, browser environment, and steps to reproduce.
- **Suggesting Enhancements**: Propose new features or improvements to existing sub-portals.
- **Adding or Updating Learning Resources**: Ensure any external resource added includes verifiable reference notes in `research-notes.md`.
- **Code Contributions**: Implement bug fixes, performance optimizations, or new micro-site portals.

---

## DEVELOPMENT ENVIRONMENT SETUP

1. **Fork and Clone the Repository**

```bash
git clone https://github.com/your-username/eduweb.git
cd eduweb
```

2. **Serve Local Environment**

Launch a static HTTP server from the root directory:

```bash
python3 -m http.server 8000
```

Navigate to `http://localhost:8000` in your web browser.

3. **Prerequisites for Validation**

Ensure Python 3 and Node.js are available on your system for running the automated validation suite:

```bash
python3 --version
node --version
```

---

## SUB-PORTAL ARCHITECTURE GUIDELINES

All EduWeb sub-portals must maintain strict structural uniformity. When creating or modifying a sub-portal, adhere to the following directory layout:

```
/portal-name/
├── index.html
├── css/
│   └── portal-name.css
└── javascript/
    └── portal-name.js
```

### Key Technical Rules
- **Standalone Execution**: Each sub-portal must be capable of rendering independently via its own `index.html`.
- **External Dependencies**: Use CDN links for Bootstrap 5.3.3, Font Awesome 6.5.2, and GSAP 3.12.5. Do not commit minified vendor bundles into sub-portal folders.
- **Links & Navigation**: External links must include `target="_blank"` and `rel="noopener"`. Internal links must use relative paths.

---

## CODING & DESIGN STANDARDS

### HTML & Accessibility
- Use semantic HTML5 elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`).
- Ensure all interactive elements have appropriate ARIA attributes and keyboard focus indicators.
- Provide descriptive `alt` attributes for all non-decorative images.

### CSS & Styling
- Maintain responsive, mobile-first design patterns using Bootstrap grid or standard CSS Grid/Flexbox.
- Support prefers-reduced-motion CSS media queries for animations.
- Use explicit CSS variable design tokens for theme colors and branding accents.

### JavaScript
- Use vanilla JavaScript (ES6+). Avoid unnecessary heavy framework dependencies.
- Ensure scripts run cleanly without throwing runtime console errors or memory leaks.
- Ensure code passes `node --check <script-path>` syntax verification.

---

## VALIDATION & TESTING

Before submitting any code changes, run the automated validation script:

```bash
python3 validate_portal.py
```

### What the Validation Engine Checks:
1. All 12 sub-portal directories exist and contain `index.html`.
2. Linked relative CSS and JS assets exist on disk.
3. All JavaScript files pass Node.js syntax checking (`node --check`).
4. `research-notes.md` exists and contains documentation headers for every sub-portal.

All checks must output `VALIDATION OK` without errors.

---

## SUBMITTING A PULL REQUEST

1. **Create a Feature Branch**

```bash
git checkout -b feature/your-feature-name
```

2. **Commit Your Changes**

Follow clean commit message conventions (short title, detailed body if necessary).

3. **Verify Validation**

Ensure `python3 validate_portal.py` succeeds with zero errors.

4. **Push Branch & Open PR**

Push your branch to GitHub and open a Pull Request against the `main` branch. Provide a clear explanation of your changes and reference any related issues.

---

Thank you for contributing to EduWeb.
