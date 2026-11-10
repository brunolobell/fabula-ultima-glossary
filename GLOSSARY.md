# Fabula Ultima Reference

An unofficial, private, Portuguese-language reference for the Fabula Ultima tabletop RPG, used by Players and Game Masters at one table to find what they need to create a character and to play. Game terms shown to Readers come from the Portuguese Core Rulebook; the names below are the app's own domain language.

## Language

### Content

**Entry**:
A single self-contained reference page about one piece of the game, with a name, a Summary and a Page reference.
_Avoid_: Term, article, record, page

**Entry Type**:
The kind of an Entry: Rule, Class, Skill, Heroic Skill, Spell, Equipment, or Guide.
_Avoid_: Category (a Fabula Ultima game term for weapons), kind (reserved for Equipment Kind)

**Rule**:
An Entry explaining a core play concept or a character-creation concept, such as Checks, Crisis, Fabula Points, Bonds, or Clocks, or a game-setup concept such as Session Zero or the Eight Pillars.
_Avoid_: Term, concept, mechanic

**Class**:
An Entry for one Fabula Ultima Class, showing its free benefits and, inline, all of its Skills and Spells.
_Avoid_: Job, archetype

**Skill**:
An Entry for one Skill belonging to a Class, with its maximum Skill Level. Shown to Readers as "Poder".
_Avoid_: Ability, perk; never name the type `power` in code

**Spell**:
An Entry for one spell, with its MP cost, target, duration, whether it is offensive, and the Class it belongs to. Shown to Readers as "Feitiço".
_Avoid_: Magic, incantation

**Heroic Skill**:
An Entry for one Skill a character may take on mastering a Class. It belongs to no Class and has no Skill Level; it may have Requirements, and it comes from one Source. Shown to Readers as "Poder Heroico".
_Avoid_: Heroic power, epic skill, perk; never name the type `power` in code

**Mastery**:
The state of a character who has taken the tenth level in a Class: the Class is mastered, earns the character one Heroic Skill, and cannot take further levels. Shown to Readers as "dominar uma classe".
_Avoid_: Maxing out, completing a Class (a Skill reaching its maximum Skill Level is not Mastery)

**Heroic Skill Requirement**:
What a Heroic Skill demands before it can be taken: nothing, Mastery of one specific Class, of any one of several Classes, of a number of Classes out of a set, optionally also holding a specific Skill. Shown to Readers as "requisitos".
_Avoid_: Prerequisite, unlock

**Skill Level**:
How many times a Skill has been taken, which strengthens it. Shown to Readers as "nível de poder (NP)".
_Avoid_: Rank, power level

**Equipment**:
An Entry for a weapon, armor, shield, accessory, or artifact (including a Piloto's vehicle modules).
_Avoid_: Item, gear

**Equipment Kind**:
Which of weapon, armor, shield, accessory, or artifact an Equipment Entry is.
_Avoid_: Equipment type, equipment category

### Guidance

**Guide**:
An Entry that walks a Reader through an ordered list of Guide Steps toward a goal, such as "Create a world", "Create a party", "Build a character" or "How to play".
_Avoid_: Tutorial, wizard, path

**Guide Step**:
One stop in a Guide, with a title, a short introduction, and the Entries to read at that point.
_Avoid_: Chapter, stage

### Sources and writing

**Core Rulebook**:
The Brazilian edition of the Fabula Ultima core rulebook ("Livro Básico", Jambô Editora, 1st edition, November 2025), the primary source of content.
_Avoid_: Livro (alone), manual, SRD

**Atlas**:
One of the three Jambô supplement books, "Atlas High Fantasy", "Atlas Natural Fantasy" and "Atlas Techno Fantasy" (1st edition, November 2025), which add Classes, rare Equipment and artifacts. Together with the Core Rulebook they are the four **Sources** of an Entry.
_Avoid_: Expansion, supplement (in the UI), setting book

**Page Reference**:
The page number printed on the page, in the Entry's Source (the Core Rulebook unless the Entry says otherwise), where its full rules appear, shown on every Entry with the book's name. It is not the PDF page index, which is 4 higher in the Core Rulebook and 2 higher in the Atlas books.
_Avoid_: Source, citation, footnote

**Summary**:
An Entry's short account of the rules in the app's own words, keeping rules and numbers exact and never copying the book's text.
_Avoid_: Definition, description, excerpt

### Game vocabulary

Names Readers see, taken from the Core Rulebook. The English name is the one used in code and docs.

**Trait**:
One of a character's three defining statements: Identity ("Identidade"), Theme ("Tema") and Origin ("Origem").
_Avoid_: Characteristic

**Bond**:
A connection between a character and another, with up to three emotions. Shown to Readers as "Laço".
_Avoid_: Relationship, link

**Attribute**:
One of the four core character scores, each a die size from d6 to d12: Dexterity ("Destreza", DES), Might ("Vigor", VIG), Insight ("Astúcia", AST) and Willpower ("Vontade", VON).
_Avoid_: Stat, ability score

**Hit Points / Mana Points**:
The two resource pools of a character, shown to Readers as "Pontos de Vida (PV)" and "Pontos de Mana (PM)".
_Avoid_: Health, energy

**Crisis**:
The state of having current Hit Points at or below half of the maximum, rounded down. Shown to Readers as "Crise".
_Avoid_: Bloodied, wounded

**Condition**:
A temporary status, such as Abalado or Lento, that lowers one or more Attribute dice. Shown to Readers as "Condição".
_Avoid_: Status effect, debuff

**Check**:
A dice roll resolving an uncertain action. Shown to Readers as "Teste".
_Avoid_: Roll, test

**Clock**:
A segmented tracker for progress or threats. Shown to Readers as "Relógio".
_Avoid_: Timer, counter

**Fabula Points**:
The meta-currency spent to invoke Traits and Bonds. Shown to Readers as "Pontos de Fabula".
_Avoid_: Hero points

### Setting up a game

**Session Zero**:
The first meeting of the Table, before play, where the Table settles its expectations, tone and themes, creates the World, picks a Party Type and creates the characters. Shown to Readers as "sessão zero".
_Avoid_: Setup session, prologue (the Prologue is a different thing, played in the first session)

**World**:
The shared setting the Table creates for its adventures: there is no default or canonical one. Recorded on a world sheet ("ficha de mundo") and a map sheet ("ficha de mapa"). Shown to Readers as "mundo", or "cenário".
_Avoid_: Campaign, setting book (an Atlas describes example locations, not the Table's World)

**Eight Pillars**:
The eight traits every World shares, whatever else the Table invents. Shown to Readers as "Oito Pilares".
_Avoid_: Core themes, canon

**Party**:
The group of heroes the Players create together, defined by a Party Type. It may be given a name. Shown to Readers as "grupo".
_Avoid_: Group (alone; in the book it also means the people at the Table), team, guild

**Party Type**:
One of five premises for a Party: Explorers, Guardians, Resistance Heroes, Revolutionaries, or United by Fate ("Exploradores", "Guardiões", "Heróis da Resistência", "Revolucionários", "Unidos pelo Destino"). It says which themes the first adventures focus on, with guiding questions, and works as a reference for creating heroes, not a restriction. Shown to Readers as "tipo de grupo".
_Avoid_: Archetype, party class

### People

**Reader**:
A Player or the Game Master using the app. Both roles are equally important and are always capitalized.
_Avoid_: User, visitor, customer

**Table**:
The Players and the Game Master who play together. Its agreements (frequency, tone, lines and veils) are made in Session Zero. Shown to Readers as "seu grupo" or "a mesa".
_Avoid_: Group (alone; see Party), campaign group
