# Memory Bank - AI Context Management

## [CT.03] Critical Context System

The Memory Bank provides persistent context for AI assistants, ensuring continuity and understanding across sessions.

## File Hierarchy & Dependencies

```
projectBrief.md
    |
productContext.md / systemPatterns.md / techContext.md
    |
activeContext.md
    |
progress.md
```

## Core Files

### 1. `projectBrief.md`

**Purpose**: High-level project overview

- Project name and mission
- Key stakeholders
- Success criteria
- Constraints and assumptions

### 2. `productContext.md`

**Purpose**: Business and product understanding

- User personas
- Value proposition
- Market context
- Business rules

### 3. `activeContext.md`

**Purpose**: Current working context

- Active sprint/phase
- Current priorities
- Recent decisions
- Blockers and risks

### 4. `systemPatterns.md`

**Purpose**: Architectural patterns and conventions

- Design patterns in use
- Coding conventions
- Technology choices rationale
- Integration patterns

### 5. `techContext.md`

**Purpose**: Technical implementation details

- Technology stack
- Dependencies
- Configuration requirements
- Performance constraints

### 6. `progress.md`

**Purpose**: Development progress tracking

- Completed milestones
- Current sprint progress
- Upcoming deliverables
- Technical debt log

## Usage Protocol

### Session Start

1. AI reads ALL memory bank files
2. Establishes context understanding
3. Identifies current focus from `activeContext.md`

### During Development

- Check memory bank when context unclear
- Update `progress.md` after significant completions
- Update `activeContext.md` when priorities shift

### Session End

- Update relevant memory files
- Document key decisions
- Note any blockers or risks

## Update Triggers

- User says "update memory bank"
- Major milestone completion
- Significant architectural decision
- Sprint/phase transition

## Best Practices

- [SF] Keep entries concise and factual
- [RP] Use clear, unambiguous language
- Include dates for time-sensitive information
- Cross-reference related documents
- Maintain consistent formatting

## Related

- `../architecture/ADR/` - Architecture Decision Records
- `../dev-journal/` - Session-level development logs

---

**Last Updated**: 2026-03-27 | **Core Files**: 6
