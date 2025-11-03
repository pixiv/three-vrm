---
name: readme-generator
description: Generate professional README files for projects. Use when the user wants to create or update a README, needs documentation for a new project, or asks for help with project documentation.
---

# README Generator Skill

When generating a README file, follow this comprehensive structure:

## 1. Project Title and Description
- Start with a clear, descriptive title
- Add a concise one-paragraph description
- Include what problem the project solves

## 2. Features
- List key features as bullet points
- Highlight what makes this project unique
- Keep it concise but informative

## 3. Installation
- Provide step-by-step installation instructions
- Include prerequisites (Node.js version, Python version, etc.)
- Show actual commands to run

Example:
```bash
npm install
# or
pip install -r requirements.txt
```

## 4. Usage
- Show basic usage examples with code blocks
- Include common use cases
- Add screenshots or demo GIFs if applicable

## 5. Configuration
- Document environment variables
- Explain configuration files
- Provide example configurations

## 6. Contributing
- Link to CONTRIBUTING.md if it exists
- Otherwise, provide basic contribution guidelines
- Mention how to report bugs

## 7. License
- Clearly state the license (MIT, Apache, GPL, etc.)
- Add a link to the LICENSE file

## 8. Optional Sections (add if relevant)
- API Documentation
- Testing instructions
- Deployment guides
- FAQ section
- Credits and acknowledgments
- Badges (build status, version, etc.)

## Tips for Good READMEs:
- Use clear, simple language
- Include code examples that actually work
- Keep it updated as the project evolves
- Use proper markdown formatting
- Add a table of contents for long READMEs
- Include contact information or links to documentation

## Auto-Detection
- Check for package.json, requirements.txt, Cargo.toml, etc. to determine project type
- Look at existing code to understand project structure
- Find existing documentation to maintain consistency
