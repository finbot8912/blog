# CLAUDE.md

## Git Repository Information

- **Repository**: https://github.com/finbot8912/blog
- **Authentication**: Use GitHub Personal Access Token (stored securely, not in code)

### Git Workflow Guidelines
- Initialize repository if .git doesn't exist: `git init`
- After creating or modifying files: `git add` and `git commit`
- When deleting files: use `git rm` and commit
- Always ensure sensitive information (.env, tokens) is in .gitignore

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**MedAlo Blog Generator** - AI-powered blog content generation and SEO optimization tool using Google Gemini AI. The application generates blog posts, images, and social media content with special support for hair loss topics using PDF reference materials.

**Tech Stack**: React 19 + TypeScript + Vite + Google Gemini AI + PDF.js

## Development Commands

### Essential Commands
```bash
# Install dependencies
npm install

# Run development server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Environment Setup
Create a `.env` file with:
```
GEMINI_API_KEY=your_gemini_api_key_here
```

The app accesses this via `process.env.API_KEY` (mapped in vite.config.ts).

## Architecture Overview

### Core Service Layer Architecture

**Three main services handle distinct responsibilities:**

1. **geminiService.ts** - AI content generation orchestrator
   - Generates blog posts with structured HTML output
   - Creates SEO metadata (keywords, titles, alt text)
   - Generates DALL-E image prompts and social media posts
   - Handles regeneration based on user feedback
   - Uses structured schemas (`responseSchema`) to enforce consistent AI outputs
   - **PDF Integration**: Automatically searches `book.pdf` for hair loss topics via `pdfService`

2. **pdfService.ts** - Reference material integration
   - Extracts text from PDF files using PDF.js
   - Detects hair loss-related topics (`isHairLossRelated()`)
   - Searches relevant content with page number tracking
   - Provides context to AI for authoritative content generation
   - **Cached PDF loading** for performance optimization

3. **keywordService.ts** - SEO and topic research
   - Analyzes keyword opportunities and competition
   - Generates topic suggestions (E-E-A-T, evergreen, longtail)
   - Integrates with search data for strategy recommendations
   - Uses `extractJsonFromText()` for parsing AI responses

### Data Flow Pattern

```
User Input → Service Layer → Gemini AI → Structured Response → UI Components
                ↓
         pdfService (if hair loss topic)
                ↓
         Enhanced Context → AI Generation
```

**Critical Integration Point**: When generating blog content for hair loss topics:
1. `isHairLossRelated(topic)` detects keywords
2. `searchRelevantContent()` extracts relevant PDF sections with page numbers
3. PDF context is passed to `getPrompt()` in geminiService
4. AI generates content citing the reference material
5. Citations include source attribution (노윤우 박사) and page numbers

### Component Architecture

**Main App (App.tsx)**
- Central orchestrator for all features
- State management for content generation workflow
- Multi-tab interface with shortcuts system
- Manages theme selection and interactive elements

**Reusable Components** (components/):
- `BlogResultsTable.tsx` - Displays generated blog topic suggestions
- `CurrentStatus.tsx` - Real-time generation status indicator
- `Icon.tsx` - Platform-specific social media icons
- `NaverNewsResults.tsx` - News-based topic recommendations
- `ResultsTable.tsx` - Generic result display table
- `Shortcuts.tsx` - Keyboard shortcut reference panel

### Type System (types.ts)

**Key type definitions:**
- `ColorTheme` - Blog styling presets (7 predefined themes)
- `GeneratedContent` - Complete AI output structure (HTML, images, metadata, social posts)
- `SupplementaryInfo` - SEO metadata package
- `SocialMediaPosts` - Platform-specific content (Threads, Instagram, Facebook, X)
- `KeywordMetrics` - SEO analysis data
- Search and content types for various features

### Constants and Configuration

**constants.ts** contains:
- `COLOR_THEMES` - 7 predefined color themes with inline styles
- `EEAT_CATEGORIES_DATA` - E-E-A-T topic categories for content strategy
- `EVERGREEN_SUBCATEGORIES` - Long-lasting content categories

**Path Aliases**: Use `@/` for root imports (configured in tsconfig.json and vite.config.ts)

## Important Implementation Details

### Gemini AI Schema Validation

The app uses **structured schemas** to ensure consistent AI outputs. All AI generation functions define `responseSchema` objects that enforce:
- Required fields for blog HTML, keywords, image prompts
- Nested object structures for supplementary info
- Array constraints for SEO titles and sub-images

**When modifying AI outputs**: Update the corresponding schema definition to maintain type safety.

### PDF Reference System

**Automatic Citation Workflow**:
1. Hair loss keyword detection triggers PDF search
2. Up to 2000 characters of relevant content extracted
3. Page numbers tracked throughout extraction
4. AI prompt includes: "참고 자료를 우선적으로 인용하세요"
5. Generated content includes citation footer:
   ```
   📚 참고 자료
   출처: 노윤우 박사
   참조 페이지: 12, 15, 23p
   ```

**PDF file location**: `/book.pdf` in public directory

### Image Generation Integration

- Featured images and sub-images use DALL-E prompts
- Prompts generated in **English** by Gemini
- Alt text generated in **Korean** for SEO
- Sub-images placed via `<!--SUB_IMAGE_PLACEHOLDER_N-->` placeholders
- Images converted to base64 for preview

### Social Media Content

Each platform has specific requirements:
- **Threads**: Informal tone (ban-mal), emojis, 1 hashtag
- **Instagram**: Visual focus, 5-10 hashtags, call-to-action
- **Facebook**: Longer format, encourages shares/comments
- **X**: Under 280 chars, 2-3 hashtags, link placeholder

## Code Patterns to Follow

### AI Service Calls
```typescript
// Always use structured schemas for consistency
const responseSchema = {
  type: Type.OBJECT,
  properties: { /* ... */ },
  required: [ /* ... */ ]
};

const response = await model.generateContent(prompt);
const result = JSON.parse(response.text());
```

### PDF Context Integration
```typescript
// Check if PDF context is needed
if (isHairLossRelated(topic)) {
  const { content, pageNumbers } = await searchRelevantContent('/book.pdf', topic);
  // Pass to AI prompt
}
```

### Error Handling
- Services wrap operations in try-catch blocks
- User-friendly error messages in Korean
- Console errors preserve technical details for debugging

### State Management
- React hooks for local state
- `useCallback` for performance optimization
- `useMemo` for expensive computations (e.g., code highlighting)

## Testing

Test files located in `services/__tests__/`. Currently includes:
- `pdfService.test.ts` - PDF extraction and search functionality

When adding tests, follow the existing pattern in this directory.

## Build Configuration

**Vite Configuration** (vite.config.ts):
- Development server: port 3000, host 0.0.0.0
- Environment variables mapped via `define`
- Path alias `@/` points to project root
- React plugin with JSX support

**TypeScript Configuration**:
- Target: ES2022
- Module: ESNext with bundler resolution
- JSX: react-jsx (React 19)
- Experimental decorators enabled
- Path aliases configured

## Special Considerations

### Korean Language Support
- All user-facing content in Korean
- AI prompts specify Korean output
- Font class `font-korean` for proper rendering

### Theme System
- Inline styles in generated HTML (no external CSS)
- Color themes use complete color palettes
- Theme colors injected into AI prompts for consistent styling

### Performance
- PDF caching to avoid repeated parsing
- Lazy loading for heavy components
- Optimized bundle with Vite
