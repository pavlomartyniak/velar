import type { BlogPost } from "@/lib/blog";

export const posts: BlogPost[] = [
  {
    slug: "vartist-budivnytstva-budynku-pid-klyuch",
    title: "How much does it cost to build a turnkey house",
    description:
      "What turnkey construction costs are made of: base rate, finishing class, engineering and the plot itself. How to get a budget estimate in minutes.",
    excerpt:
      "We break down what a construction estimate consists of and why two villas that look identical can cost very different amounts.",
    publishedAt: "2026-05-04",
    blocks: [
      {
        type: "paragraph",
        text: "This is the first question almost everyone asks when thinking about building their own house. The honest answer is that there's no single \"market average\" figure — the cost is made up of several independent components, and each one can shift the total by 20–40%. Let's go through them one by one.",
      },
      { type: "heading", text: "The base rate per square meter" },
      {
        type: "paragraph",
        text: "The starting point is the house's area and architectural style. Simple, clean forms (minimalism, contemporary modern) cost less than complex multi-pitched roofs, bay windows and the elaborate decor of classic or neoclassical styles: more material, more manual work, a longer build time.",
      },
      { type: "heading", text: "Finishing class — the biggest cost driver" },
      {
        type: "paragraph",
        text: "The difference between standard, premium and de luxe finishing affects the budget more than any other single factor. Mid-range standard materials, designer solutions with natural materials, or exclusive custom finishing are three completely different budgets, even for the exact same house shell.",
      },
      { type: "heading", text: "Engineering and structure" },
      {
        type: "paragraph",
        text: "Wall material (aerated concrete, brick, monolithic frame), roof type, and the heating system — a gas boiler, a heat pump or electric heating — plus extras like heat-recovery ventilation or a smart home system, all directly affect the final price. A heat pump costs more upfront but can save up to 70% on heating during operation.",
      },
      { type: "heading", text: "The plot and utility connections" },
      {
        type: "paragraph",
        text: "Terrain, foundation type (slab, strip or pile) and whether utilities — water, gas, electricity, sewage — are already available often fall outside a first rough estimate, yet they can add a meaningful sum to the budget. More on this in our article on hidden construction costs.",
      },
      { type: "heading", text: "How to calculate your own budget" },
      {
        type: "paragraph",
        text: "There's no universal \"price per m²\" because it always depends on the combination of factors above. The fastest way to get a realistic figure is the construction configurator: choose a style, area, finishing class and options, and get an estimated budget and 3D visualization tailored to your parameters within minutes.",
      },
    ],
  },
  {
    slug: "z-choho-pochynayetsya-budivnytstvo-budynku",
    title: "Where does building a house actually start",
    description:
      "The step-by-step path from idea to the first brick: choosing a plot, an architectural project, permits, contract and estimate.",
    excerpt:
      "Construction doesn't start with the foundation — it starts much earlier. We explain the sequence of steps that saves money and nerves.",
    publishedAt: "2026-05-18",
    blocks: [
      {
        type: "paragraph",
        text: "The most common mistake is looking for a construction crew before you have a finished project. Without a project, you can't accurately calculate the estimate or avoid on-site redesigns, which always cost more than changes made on paper. Here's the correct sequence.",
      },
      { type: "heading", text: "1. The plot and initial data" },
      {
        type: "paragraph",
        text: "If you already have a plot, we record its terrain, orientation and available utilities. If you don't have one yet, this is the stage to at least roughly estimate the area and budget so the project accounts for realistic siting conditions from the start.",
      },
      { type: "heading", text: "2. The architectural project" },
      {
        type: "paragraph",
        text: "This is the foundation of everything: the architectural and structural sections, plus a construction cost estimate. A solid project answers questions about the number of floors, room layout, style, roof and engineering systems before any equipment arrives on site. Development usually takes 2–3 months, depending on complexity.",
      },
      { type: "heading", text: "3. Permits" },
      {
        type: "paragraph",
        text: "Most private houses require a construction passport or a full set of permit documentation, depending on the project's parameters. This is the legal basis without which construction formally cannot begin. Read more about what this document actually is in a separate article.",
      },
      { type: "heading", text: "4. Contract and staged payment" },
      {
        type: "paragraph",
        text: "A formal contract locks in the estimate, timeline and payment stages, so neither side pays \"everything upfront.\" Transparent staged payment is a sign of a company that's accountable for the result, not just for signing the deal.",
      },
      { type: "heading", text: "5. Preparatory work on site" },
      {
        type: "paragraph",
        text: "Surveying, soil testing, staking out the plot and building the foundation are the first physical actions on site. This is exactly where a well-developed structural section saves you from surprises: the foundation type is already chosen for the specific terrain and soil, not guessed on the spot.",
      },
      {
        type: "paragraph",
        text: "If you don't have a project yet, start with the design configurator: in a few minutes it will put together a budget estimate for the documentation your future house needs.",
      },
    ],
  },
  {
    slug: "terminy-budivnytstva-villy",
    title: "How long does it take to build a villa",
    description:
      "Realistic timelines for each stage — from design to handing over the keys. What speeds up and what slows down building a country house.",
    excerpt:
      "\"Fast\" and \"well built\" rarely go together in construction. We break the process into stages to see where the final timeline actually comes from.",
    publishedAt: "2026-06-01",
    blocks: [
      {
        type: "paragraph",
        text: "A villa's construction timeline isn't a single number — it's the sum of several sequential stages, each with its own logic and its own risk of delay.",
      },
      { type: "heading", text: "Design — 2–3 months" },
      {
        type: "paragraph",
        text: "Developing the architectural and structural sections, visualizations and the estimate takes 2–3 months on average. A complex custom facade with many bay windows and details takes longer to draft than clean minimalism.",
      },
      { type: "heading", text: "Groundwork and foundation" },
      {
        type: "paragraph",
        text: "Surveying, soil testing, staking out the plot and building the foundation form the first physical phase. Difficult terrain or weak soil that requires a pile foundation extends this stage compared to a flat plot with a slab foundation.",
      },
      { type: "heading", text: "Shell, roof and utility systems" },
      {
        type: "paragraph",
        text: "Building the walls, installing the roof and running the utilities is the most time-consuming part. Wall material (aerated concrete goes up faster than a monolithic frame) and roof type (flat is simpler than a complex mansard shape) directly affect duration.",
      },
      { type: "heading", text: "Finishing" },
      {
        type: "paragraph",
        text: "The finishing class determines not just the budget but the timeline too: standard materials install faster than exclusive de luxe custom solutions, which are often made or approved to order.",
      },
      { type: "heading", text: "What can be sped up — and what can't" },
      {
        type: "list",
        items: [
          "An accelerated schedule with a reinforced crew is realistic for standard solutions",
          "A finished, well-thought-out project with no mid-construction changes saves weeks",
          "Difficult site geology and non-standard architecture don't speed up well — quality takes priority over speed here",
        ],
      },
      {
        type: "paragraph",
        text: "You can get an estimated timeline for your specific house — based on the style, area and finishing class you choose — from the construction configurator in a few minutes.",
      },
    ],
  },
  {
    slug: "yak-obraty-arhitektora",
    title: "How to choose an architect for your house",
    description:
      "Five criteria worth checking before trusting an architect or studio with the project for your future house.",
    excerpt:
      "A portfolio alone isn't a guarantee. Here's what to look for so the project doesn't turn into an endless chase.",
    publishedAt: "2026-06-15",
    blocks: [
      {
        type: "paragraph",
        text: "An architect is someone you'll work closely with for months, and their decisions determine how comfortable the house will be to live in ten years from now. Here's what to look at when choosing a specialist or company.",
      },
      { type: "heading", text: "1. A portfolio with real, not just rendered, projects" },
      {
        type: "paragraph",
        text: "A beautiful visualization doesn't guarantee the project was actually built and works in practice. Ask for photos of completed objects and, ideally, the chance to talk to previous clients about their experience.",
      },
      { type: "heading", text: "2. A fixed estimate in the contract" },
      {
        type: "paragraph",
        text: "If the price is \"to be clarified along the way,\" that's a red flag. A reliable partner locks in the cost in the contract before work starts, and it doesn't change during the process except for cases you've explicitly agreed to separately.",
      },
      { type: "heading", text: "3. One point of contact for the whole project" },
      {
        type: "paragraph",
        text: "When architects, engineers and builders coordinate separately and you become the middleman between them, the risk of things falling out of sync rises sharply. A full-cycle company with one accountable contact takes that burden off you.",
      },
      { type: "heading", text: "4. Staged payment tied to results" },
      {
        type: "paragraph",
        text: "Paying in installments — say, 30% at the start, 30% during development, 40% after the finished documentation is delivered — protects you from paying in full with nothing to show for it.",
      },
      { type: "heading", text: "5. Willingness to explain every decision" },
      {
        type: "paragraph",
        text: "A good architect justifies choices about wall material, roof type or heating system with concrete technical and budget consequences, not fashion. If direct questions about timelines, price or materials get vague answers, that's a reason to look for a different partner.",
      },
      {
        type: "paragraph",
        text: "If you want to see the approach in practice, the design configurator lets you get an estimated cost in minutes and see exactly how the price of your future project is built up.",
      },
    ],
  },
  {
    slug: "prykhovani-vytraty-pry-budivnytstvi",
    title: "Hidden costs when building a house",
    description:
      "Five cost items most often missing from a first estimate: utility connections, geology, mid-construction changes and more.",
    excerpt:
      "The estimate on paper and the final bill often differ not because of dishonesty, but because of line items nobody thought to ask about in advance.",
    publishedAt: "2026-06-22",
    blocks: [
      {
        type: "paragraph",
        text: "Most construction budget overruns have nothing to do with being cheated — they happen because certain cost items aren't part of a standard preliminary estimate and only surface during detailed planning or once work is already on site.",
      },
      { type: "heading", text: "Utility connections" },
      {
        type: "paragraph",
        text: "Water, gas, electricity and sewage — if utilities are already available at the edge of the plot, that's one budget. If they need to be run from scratch, connecting each utility becomes a separate line item, and it's worth asking about this as early as when you're choosing the plot.",
      },
      { type: "heading", text: "Geology and surveying" },
      {
        type: "paragraph",
        text: "A topographic survey and soil testing are needed to choose the right foundation. On difficult terrain or weak soil, these investigations aren't a formality — they're how you avoid far more expensive foundation problems after the walls are already up.",
      },
      { type: "heading", text: "Changes during construction" },
      {
        type: "paragraph",
        text: "Any decision made after work has started — moving a wall, changing the window type, adding a room — costs significantly more than the same decision made at the design stage. A well-developed architectural project with everything worked out in advance isn't an expense; it's how you save money.",
      },
      { type: "heading", text: "Upgrading the finishing class at the last moment" },
      {
        type: "paragraph",
        text: "Switching from standard to premium or de luxe finishing once construction is already underway is often more expensive than if that decision had been built into the estimate from the start, since some materials and work have to be redone.",
      },
      { type: "heading", text: "Additional engineering systems" },
      {
        type: "paragraph",
        text: "A pool, smart home system, solar panels, a backup generator — all of these are real, in-demand options, but they should be included in the initial estimate rather than added \"along the way\" after construction has begun.",
      },
      {
        type: "paragraph",
        text: "To see all cost items at once, rather than piece by piece, use the construction configurator — it accounts for the plot, utilities, finishing and extra options in a single budget estimate.",
      },
    ],
  },
  {
    slug: "budivelnyi-pasport-shcho-tse",
    title: "What is a construction passport, and why do you need one",
    description:
      "A plain-language explanation of what a construction passport for a land plot is, when you need it, and how it differs from a full project.",
    excerpt:
      "One of the most common questions at the start of building a private house. Here's the document explained without the legal jargon.",
    publishedAt: "2026-06-29",
    blocks: [
      {
        type: "paragraph",
        text: "A construction passport for a land plot is a document that defines the urban planning conditions and restrictions for a specific plot: where the house can be located, how many floors it can have, required setbacks from neighboring boundaries, and other basic development parameters. For individual house construction, it's one of the common routes to a legal basis for starting work.",
      },
      { type: "heading", text: "Why you need it" },
      {
        type: "paragraph",
        text: "Without approved urban planning conditions, you can't legally start building a private house. The passport records exactly what, where, and how large you're allowed to build on a specific plot, aligning your plans with the area's urban planning documentation.",
      },
      { type: "heading", text: "How it differs from a full project" },
      {
        type: "paragraph",
        text: "A construction passport isn't a substitute for an architectural project — it's the permit basis on which that project is developed. The architectural and structural sections, the estimate, and the engineering solutions are the next, much more detailed level of documentation needed directly for construction.",
      },
      { type: "heading", text: "When to get it" },
      {
        type: "paragraph",
        text: "Ideally, at the start of work on the project, alongside the development of the architectural section, so the house's parameters are aligned with the permitted urban planning conditions from day one, and nothing needs to be redone after the fact.",
      },
      { type: "heading", text: "Who handles it" },
      {
        type: "paragraph",
        text: "Obtaining a construction passport is a procedure with clear document requirements, so in practice it's usually handled by the architect or the company running the project rather than the plot owner alone.",
      },
      {
        type: "paragraph",
        text: "Support with obtaining the construction passport is already included in the Premium design package; in the Light and Basic packages, it can be ordered separately. Exact details for your specific plot will be confirmed by the architect after you fill out the design configurator.",
      },
    ],
  },
];
