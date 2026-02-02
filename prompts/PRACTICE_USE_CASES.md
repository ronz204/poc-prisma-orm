# 🎮 CASOS DE USO - PLATAFORMA DE ESPORTS

Este documento contiene 10 casos de uso realistas con reglas de dominio bien definidas para practicar implementación con Prisma ORM.

---

## 📋 ÍNDICE DE CASOS DE USO

1. [Registro de Jugador con Validaciones](#1-registro-de-jugador-con-validaciones)
2. [Creación de Equipo y Asignación de Jugadores](#2-creación-de-equipo-y-asignación-de-jugadores)
3. [Sistema de Transferencias entre Equipos](#3-sistema-de-transferencias-entre-equipos)
4. [Registro de Equipo a Torneo](#4-registro-de-equipo-a-torneo)
5. [Generación de Bracket de Torneo](#5-generación-de-bracket-de-torneo)
6. [Ejecución de Partido y Actualización de Estadísticas](#6-ejecución-de-partido-y-actualización-de-estadísticas)
7. [Dashboard de Estadísticas de Jugador](#7-dashboard-de-estadísticas-de-jugador)
8. [Sistema de Rankings de Equipos](#8-sistema-de-rankings-de-equipos)
9. [Gestión de Ciclo de Vida de Torneo](#9-gestión-de-ciclo-de-vida-de-torneo)
10. [Reportes Analíticos Avanzados](#10-reportes-analíticos-avanzados)

---

## 1️⃣ REGISTRO DE JUGADOR CON VALIDACIONES

### 📝 Descripción
Registrar un nuevo jugador en la plataforma con todas las validaciones necesarias.

### 🎯 Reglas de Dominio

**Validaciones de Entrada:**
- ✅ El email debe ser único en el sistema
- ✅ El nombre debe ser único (no puede haber dos jugadores con el mismo nombre)
- ✅ El email debe tener formato válido
- ✅ El nombre debe tener entre 3 y 50 caracteres
- ✅ El país debe existir en la base de datos

**Reglas de Negocio:**
- 🔹 Un jugador nuevo siempre inicia con status `ACTIVE`
- 🔹 Por defecto, `isFreeAgent` debe ser `true` (no pertenece a ningún equipo)
- 🔹 Las estadísticas iniciales (`totalWins`, `totalLosses`) deben ser 0
- 🔹 Si el país no existe, debe crearse automáticamente

### 📥 Entrada Esperada
```typescript
{
  name: "Faker",
  email: "faker@t1.gg",
  country: {
    name: "South Korea",
    code: "KR"
  }
}
```

### 📤 Salida Esperada
```typescript
{
  id: 1,
  name: "Faker",
  email: "faker@t1.gg",
  isFreeAgent: true,
  status: "ACTIVE",
  totalWins: 0,
  totalLosses: 0,
  countryId: 15,
  country: {
    name: "South Korea",
    code: "KR"
  }
}
```

### ⚠️ Casos de Error
- Email ya registrado → `ConflictException: Email already in use`
- Nombre ya existente → `ConflictException: Player name already taken`
- País con código inválido → `ValidationException: Invalid country code`

---

## 2️⃣ CREACIÓN DE EQUIPO Y ASIGNACIÓN DE JUGADORES

### 📝 Descripción
Crear un nuevo equipo y agregar jugadores como miembros con diferentes roles.

### 🎯 Reglas de Dominio

**Validaciones de Creación:**
- ✅ El `tag` del equipo debe ser único (3-5 caracteres, mayúsculas)
- ✅ El `name` del equipo debe ser único
- ✅ El equipo debe tener al menos 1 jugador y máximo 10
- ✅ Todos los jugadores deben existir y estar disponibles (`isFreeAgent = true`)

**Reglas de Asignación de Miembros:**
- 🔹 Solo puede haber 1 CAPTAIN por equipo
- 🔹 Debe haber al menos 3 PLAYER (titulares)
- 🔹 Puede haber máximo 2 SUBSTITUTE
- 🔹 Puede haber máximo 1 COACH
- 🔹 Un jugador no puede estar en dos equipos activos simultáneamente
- 🔹 Al agregar un jugador al equipo, su `isFreeAgent` debe cambiar a `false`

### 📥 Entrada Esperada
```typescript
{
  tag: "T1",
  name: "T1 Esports",
  logoUrl: "https://t1.gg/logo.png",
  members: [
    { playerId: 1, role: "CAPTAIN" },    // Faker
    { playerId: 2, role: "PLAYER" },     // Gumayusi
    { playerId: 3, role: "PLAYER" },     // Keria
    { playerId: 4, role: "PLAYER" },     // Zeus
    { playerId: 5, role: "PLAYER" },     // Oner
    { playerId: 6, role: "SUBSTITUTE" }, // Poby
    { playerId: 7, role: "COACH" }       // Roach
  ]
}
```

### 📤 Salida Esperada
```typescript
{
  id: 1,
  tag: "T1",
  name: "T1 Esports",
  isActive: true,
  members: [
    { playerId: 1, role: "CAPTAIN", joinedAt: "2026-01-15T10:00:00Z" },
    // ... resto de miembros
  ],
  memberCount: 7
}
```

### ⚠️ Casos de Error
- Tag duplicado → `ConflictException: Team tag already exists`
- Más de 1 capitán → `ValidationException: Only one captain allowed`
- Menos de 3 titulares → `ValidationException: Minimum 3 players required`
- Jugador ya en equipo → `ConflictException: Player already in active team`

---

## 3️⃣ SISTEMA DE TRANSFERENCIAS ENTRE EQUIPOS

### 📝 Descripción
Transferir un jugador de un equipo a otro con historial completo.

### 🎯 Reglas de Dominio

**Validaciones de Transferencia:**
- ✅ El jugador debe pertenecer actualmente al equipo de origen
- ✅ El equipo de destino debe estar activo (`isActive = true`)
- ✅ El equipo de destino no debe tener el roster completo (máximo 10 miembros)
- ✅ El monto de transferencia debe ser >= 0
- ✅ El jugador no puede estar suspendido (`status != SUSPENDED`)

**Proceso de Transferencia (Transacción Atómica):**
1. 🔹 Crear registro en tabla `Transfer` con fecha y monto
2. 🔹 Actualizar el miembro del equipo origen: establecer `leftAt = now()`
3. 🔹 Crear nuevo registro en `Member` con el equipo destino
4. 🔹 El jugador mantiene `isFreeAgent = false` (sigue en equipo)

**Restricciones Temporales:**
- 🔹 No se pueden hacer más de 3 transferencias del mismo jugador en 30 días
- 🔹 Durante un torneo activo, los jugadores registrados no pueden ser transferidos

### 📥 Entrada Esperada
```typescript
{
  playerId: 5,
  fromTeamId: 1,  // T1
  toTeamId: 2,    // Gen.G
  transferFee: 1500000.00,
  transferDate: "2026-02-01T15:00:00Z"
}
```

### 📤 Salida Esperada
```typescript
{
  id: 1,
  playerId: 5,
  player: { name: "Oner" },
  fromTeam: { tag: "T1", name: "T1 Esports" },
  toTeam: { tag: "GENG", name: "Gen.G Esports" },
  transferFee: 1500000.00,
  transferDate: "2026-02-01T15:00:00Z",
  previousMembership: {
    joinedAt: "2025-11-01T00:00:00Z",
    leftAt: "2026-02-01T15:00:00Z"
  }
}
```

### ⚠️ Casos de Error
- Jugador no pertenece al equipo origen → `ValidationException: Player not in source team`
- Roster completo → `ValidationException: Destination team roster is full`
- Más de 3 transferencias en 30 días → `BusinessRuleException: Transfer limit exceeded`

---

## 4️⃣ REGISTRO DE EQUIPO A TORNEO

### 📝 Descripción
Inscribir un equipo a un torneo verificando todos los requisitos.

### 🎯 Reglas de Dominio

**Validaciones de Registro:**
- ✅ El torneo debe estar en estado `REGISTRATION_OPEN`
- ✅ El equipo no debe estar ya registrado en ese torneo
- ✅ La fecha actual debe estar entre `registrationStart` y `registrationEnd`
- ✅ El número de equipos registrados no debe exceder `maxTeams`
- ✅ El equipo debe tener entre `minTeamSize` y `maxTeamSize` jugadores activos

**Validaciones del Roster:**
- 🔹 Todos los miembros del equipo deben tener status `ACTIVE`
- 🔹 El equipo debe tener al menos 1 CAPTAIN
- 🔹 Los jugadores no deben estar registrados en otro torneo del mismo juego con fechas solapadas

**Estado Inicial:**
- 🔹 `isApproved` comienza en `false` (requiere aprobación manual)
- 🔹 `isCheckedIn` comienza en `false`
- 🔹 `finalStanding` es `null` hasta que termine el torneo

### 📥 Entrada Esperada
```typescript
{
  teamId: 1,
  tournamentId: 5
}
```

### 📤 Salida Esperada
```typescript
{
  id: 1,
  teamId: 1,
  team: {
    tag: "T1",
    name: "T1 Esports",
    activeMemberCount: 7
  },
  tournamentId: 5,
  tournament: {
    name: "Worlds 2026",
    status: "REGISTRATION_OPEN",
    registeredTeams: 15,
    maxTeams: 24
  },
  isApproved: false,
  isCheckedIn: false,
  createdAt: "2026-02-01T10:00:00Z"
}
```

### ⚠️ Casos de Error
- Registro cerrado → `BusinessRuleException: Tournament registration is closed`
- Equipo ya registrado → `ConflictException: Team already registered`
- Torneo lleno → `BusinessRuleException: Tournament is full`
- Roster inválido → `ValidationException: Team roster does not meet requirements`

---

## 5️⃣ GENERACIÓN DE BRACKET DE TORNEO

### 📝 Descripción
Generar automáticamente el bracket de partidos para un torneo según su formato.

### 🎯 Reglas de Dominio

**Validaciones Previas:**
- ✅ El torneo debe estar en estado `REGISTRATION_CLOSED`
- ✅ Debe haber al menos 2 equipos con `isApproved = true` y `isCheckedIn = true`
- ✅ No deben existir partidos ya generados para este torneo

**Reglas de Generación según Formato:**

**SINGLE_ELIMINATION:**
- 🔹 Número de equipos debe ser potencia de 2 (4, 8, 16, 32)
- 🔹 Si no es potencia de 2, dar "bye" a equipos mejor ranqueados
- 🔹 Generar rondas: ROUND_OF_32 → ROUND_OF_16 → QUARTERFINALS → SEMIFINALS → FINALS
- 🔹 Cada partido es `bestOf = 3` (excepto finales: `bestOf = 5`)

**ROUND_ROBIN:**
- 🔹 Cada equipo juega contra todos los demás una vez
- 🔹 Número de partidos = n * (n-1) / 2 (donde n = equipos)
- 🔹 Todos los partidos tienen phase = `GROUPS`

**Asignación de Partidos:**
- 🔹 Los equipos se asignan como `teamAlpha` y `teamBeta` aleatoriamente
- 🔹 Cada partido recibe un número secuencial único dentro del torneo
- 🔹 Status inicial = `SCHEDULED`
- 🔹 `scheduledAt` debe distribuirse uniformemente durante el torneo

### 📥 Entrada Esperada
```typescript
{
  tournamentId: 5,
  format: "SINGLE_ELIMINATION",
  checkedInTeams: [1, 2, 3, 4, 5, 6, 7, 8]  // 8 equipos
}
```

### 📤 Salida Esperada
```typescript
{
  tournamentId: 5,
  format: "SINGLE_ELIMINATION",
  generatedMatches: [
    // QUARTERFINALS
    { number: 1, phase: "QUARTERFINALS", teamAlphaId: 1, teamBetaId: 8, bestOf: 3 },
    { number: 2, phase: "QUARTERFINALS", teamAlphaId: 4, teamBetaId: 5, bestOf: 3 },
    { number: 3, phase: "QUARTERFINALS", teamAlphaId: 2, teamBetaId: 7, bestOf: 3 },
    { number: 4, phase: "QUARTERFINALS", teamAlphaId: 3, teamBetaId: 6, bestOf: 3 },
    // SEMIFINALS
    { number: 5, phase: "SEMIFINALS", teamAlphaId: null, teamBetaId: null, bestOf: 3 },
    { number: 6, phase: "SEMIFINALS", teamAlphaId: null, teamBetaId: null, bestOf: 3 },
    // FINALS
    { number: 7, phase: "FINALS", teamAlphaId: null, teamBetaId: null, bestOf: 5 }
  ],
  totalMatches: 7
}
```

### ⚠️ Casos de Error
- Estado inválido → `BusinessRuleException: Tournament not ready for bracket generation`
- Equipos insuficientes → `ValidationException: Not enough teams checked in`
- Bracket ya generado → `ConflictException: Matches already generated for this tournament`

---

## 6️⃣ EJECUCIÓN DE PARTIDO Y ACTUALIZACIÓN DE ESTADÍSTICAS

### 📝 Descripción
Registrar el resultado de un partido y actualizar todas las estadísticas relacionadas.

### 🎯 Reglas de Dominio

**Validaciones de Partido:**
- ✅ El partido debe estar en estado `SCHEDULED` o `ONGOING`
- ✅ Ambos equipos deben tener jugadores registrados como participantes
- ✅ Cada equipo debe tener entre 3 y 5 participantes
- ✅ Los participantes deben ser miembros activos del equipo

**Reglas de Puntuación:**
- 🔹 El partido es `bestOf` N (ejemplo: bestOf=3 significa el primero en ganar 2 maps)
- 🔹 El ganador debe alcanzar `Math.ceil(bestOf / 2)` victorias
- 🔹 Si `scoreAlpha = 2` y `scoreBeta = 1` en bestOf=3, Alpha gana
- 🔹 El equipo ganador se registra en `teamWinnerId`

**Actualización de Estadísticas (Transacción Atómica):**

1. **Actualizar Match:**
   - 🔹 Establecer `status = COMPLETED`
   - 🔹 Registrar `finishedAt = now()`
   - 🔹 Establecer `teamWinnerId`

2. **Actualizar Players (totalWins/totalLosses):**
   - 🔹 Jugadores del equipo ganador: `totalWins += scoreAlpha`
   - 🔹 Jugadores del equipo perdedor: `totalLosses += scoreBeta`

3. **Registrar Participant Stats:**
   - 🔹 Actualizar kills, deaths, assists de cada jugador
   - 🔹 Marcar MVP del partido (jugador con mejor KDA)

4. **Avanzar Bracket (si aplica):**
   - 🔹 Si es eliminación simple, el ganador avanza al siguiente partido
   - 🔹 Actualizar `teamAlphaId` o `teamBetaId` del partido siguiente

### 📥 Entrada Esperada
```typescript
{
  matchId: 1,
  scoreAlpha: 2,
  scoreBeta: 1,
  participants: [
    { playerId: 1, teamId: 1, kills: 15, deaths: 3, assists: 22 },  // Faker
    { playerId: 2, teamId: 1, kills: 12, deaths: 5, assists: 18 },  // Gumayusi
    { playerId: 3, teamId: 1, kills: 8, deaths: 4, assists: 25 },   // Keria
    { playerId: 10, teamId: 8, kills: 10, deaths: 12, assists: 15 },
    { playerId: 11, teamId: 8, kills: 8, deaths: 11, assists: 12 },
    { playerId: 12, teamId: 8, kills: 5, deaths: 10, assists: 10 }
  ]
}
```

### 📤 Salida Esperada
```typescript
{
  matchId: 1,
  status: "COMPLETED",
  teamWinner: { id: 1, tag: "T1" },
  scoreAlpha: 2,
  scoreBeta: 1,
  participants: [
    {
      playerId: 1,
      player: { name: "Faker" },
      kills: 15,
      deaths: 3,
      assists: 22,
      kda: 12.33,
      mvp: true
    },
    // ... resto de participantes
  ],
  finishedAt: "2026-02-01T18:45:00Z",
  nextMatch: {
    id: 5,
    phase: "SEMIFINALS",
    teamAlphaId: 1  // T1 avanza
  }
}
```

### ⚠️ Casos de Error
- Partido no iniciado → `BusinessRuleException: Match must be scheduled or ongoing`
- Puntuación inválida → `ValidationException: Score does not match bestOf format`
- Participantes faltantes → `ValidationException: Not enough participants for both teams`

---

## 7️⃣ DASHBOARD DE ESTADÍSTICAS DE JUGADOR

### 📝 Descripción
Obtener un resumen completo de las estadísticas y rendimiento de un jugador.

### 🎯 Reglas de Dominio

**Datos a Calcular:**
- ✅ Estadísticas generales (wins, losses, winrate)
- ✅ Estadísticas de participación en partidos (KDA promedio, total kills/deaths/assists)
- ✅ Historial de equipos (actuales y anteriores)
- ✅ Torneos en los que ha participado
- ✅ Transferencias históricas
- ✅ Número de veces MVP

**Cálculos Derivados:**
- 🔹 `winRate = (totalWins / (totalWins + totalLosses)) * 100`
- 🔹 `avgKDA = (avgKills + avgAssists) / avgDeaths`
- 🔹 `totalMatches = count(distinct matchId from participants)`
- 🔹 `mvpCount = count(participants where mvp = true)`

**Filtros Opcionales:**
- 🔹 Por rango de fechas
- 🔹 Por torneo específico
- 🔹 Por equipo específico

### 📥 Entrada Esperada
```typescript
{
  playerId: 1,
  filters: {
    startDate: "2025-01-01",
    endDate: "2026-02-01",
    tournamentId: 5  // Opcional
  }
}
```

### 📤 Salida Esperada
```typescript
{
  player: {
    id: 1,
    name: "Faker",
    status: "ACTIVE",
    country: { name: "South Korea", code: "KR" }
  },
  generalStats: {
    totalWins: 156,
    totalLosses: 45,
    winRate: 77.61,
    matchesPlayed: 67
  },
  performanceStats: {
    totalKills: 1245,
    totalDeaths: 312,
    totalAssists: 1890,
    avgKills: 18.6,
    avgDeaths: 4.7,
    avgAssists: 28.2,
    avgKDA: 10.0,
    mvpCount: 23
  },
  currentTeam: {
    id: 1,
    tag: "T1",
    name: "T1 Esports",
    role: "CAPTAIN",
    joinedAt: "2025-11-01T00:00:00Z"
  },
  teamHistory: [
    {
      teamId: 3,
      teamTag: "SKT",
      role: "PLAYER",
      joinedAt: "2023-01-01T00:00:00Z",
      leftAt: "2025-10-31T23:59:59Z",
      duration: "2 years 10 months"
    }
  ],
  tournaments: [
    {
      id: 5,
      name: "Worlds 2026",
      finalStanding: 1,
      matchesPlayed: 12,
      mvps: 5
    }
  ],
  transfers: [
    {
      id: 15,
      from: "SKT T1",
      to: "T1 Esports",
      date: "2025-11-01",
      fee: 2000000.00
    }
  ]
}
```

---

## 8️⃣ SISTEMA DE RANKINGS DE EQUIPOS

### 📝 Descripción
Calcular y generar un ranking de equipos basado en diferentes criterios.

### 🎯 Reglas de Dominio

**Criterios de Ranking:**
- ✅ Win Rate general del equipo en torneos
- ✅ Puntuación ELO (basada en victoria/derrota y rating del oponente)
- ✅ Premios ganados en torneos
- ✅ Rendimiento reciente (últimos 30 días con más peso)

**Cálculo de ELO:**
```
Expected Score = 1 / (1 + 10^((OpponentELO - TeamELO) / 400))
New ELO = Old ELO + K * (Actual Score - Expected Score)

Donde:
- K = 32 para equipos nuevos, 16 para equipos establecidos
- Actual Score = 1 si gana, 0 si pierde
```

**Fórmula de Ranking:**
```
Ranking Score = (Win Rate * 0.4) + (ELO / 30) + (Prize Points * 0.2) + (Recent Performance * 0.2)

Donde:
- Win Rate = wins / (wins + losses) * 100
- Prize Points = Total prizes won / 100000
- Recent Performance = win rate últimos 30 días * 100
```

**Reglas de Empate:**
- 🔹 Si dos equipos tienen el mismo score, desempata el que tenga más partidos ganados
- 🔹 Si persiste empate, desempata el ELO más alto
- 🔹 Si persiste, desempata el equipo más antiguo

### 📥 Entrada Esperada
```typescript
{
  gameId: 1,        // League of Legends
  region: "GLOBAL", // o "KR", "NA", "EU", etc.
  limit: 20,
  minMatches: 10    // Mínimo de partidos para calificar
}
```

### 📤 Salida Esperada
```typescript
{
  rankings: [
    {
      rank: 1,
      team: {
        id: 1,
        tag: "T1",
        name: "T1 Esports"
      },
      stats: {
        matchesPlayed: 87,
        wins: 72,
        losses: 15,
        winRate: 82.76,
        elo: 2450,
        totalPrizes: 5250000.00,
        recentWinRate: 85.71  // Últimos 30 días
      },
      rankingScore: 95.83,
      change: +2  // Posiciones ganadas desde último ranking
    },
    {
      rank: 2,
      team: { id: 2, tag: "GENG", name: "Gen.G Esports" },
      stats: {
        matchesPlayed: 92,
        wins: 68,
        losses: 24,
        winRate: 73.91,
        elo: 2380,
        totalPrizes: 4100000.00,
        recentWinRate: 75.00
      },
      rankingScore: 89.27,
      change: -1
    }
    // ... top 20
  ],
  generatedAt: "2026-02-01T12:00:00Z",
  criteria: {
    winRateWeight: 0.4,
    eloWeight: 0.333,
    prizeWeight: 0.2,
    recentPerformanceWeight: 0.2
  }
}
```

---

## 9️⃣ GESTIÓN DE CICLO DE VIDA DE TORNEO

### 📝 Descripción
Administrar las transiciones de estado de un torneo y automatizar acciones correspondientes.

### 🎯 Reglas de Dominio

**Estados del Torneo:**
```
REGISTRATION_OPEN → REGISTRATION_CLOSED → IN_PROGRESS → COMPLETED
                                     ↓
                                 CANCELLED
```

**Transiciones Permitidas:**

**1. REGISTRATION_OPEN → REGISTRATION_CLOSED:**
- ✅ Solo si `now() >= registrationEnd`
- ✅ Debe haber al menos 2 equipos con `isApproved = true`
- 🔹 **Acción:** Enviar notificación a equipos aprobados para check-in

**2. REGISTRATION_CLOSED → IN_PROGRESS:**
- ✅ Solo si el bracket ha sido generado (existen matches)
- ✅ Al menos 50% de equipos aprobados hicieron check-in
- ✅ `now() >= tournamentStart`
- 🔹 **Acción:** Establecer primer partido como `SCHEDULED`, resto queda pendiente

**3. IN_PROGRESS → COMPLETED:**
- ✅ Todos los partidos deben estar en estado `COMPLETED`
- ✅ Debe existir un `teamWinner` en el partido FINALS
- 🔹 **Acciones:** 
  - Calcular `finalStanding` para todos los equipos
  - Distribuir premios según standings
  - Actualizar ELO de todos los equipos participantes

**4. Cualquier estado → CANCELLED:**
- ✅ Puede cancelarse solo si está en `REGISTRATION_OPEN` o `REGISTRATION_CLOSED`
- ✅ No puede cancelarse si hay partidos `COMPLETED`
- 🔹 **Acciones:**
  - Reembolsar fees de inscripción (si aplica)
  - Notificar a todos los equipos registrados
  - Eliminar partidos generados

### 📥 Entrada Esperada
```typescript
{
  tournamentId: 5,
  newStatus: "IN_PROGRESS",
  triggeredBy: "SYSTEM",  // o "ADMIN"
  reason: "Tournament start date reached"
}
```

### 📤 Salida Esperada
```typescript
{
  tournamentId: 5,
  previousStatus: "REGISTRATION_CLOSED",
  currentStatus: "IN_PROGRESS",
  transitionDate: "2026-02-10T10:00:00Z",
  automatedActions: [
    {
      action: "SCHEDULE_FIRST_MATCHES",
      affectedMatches: [1, 2, 3, 4],
      result: "SUCCESS"
    },
    {
      action: "NOTIFY_TEAMS",
      recipients: 8,
      result: "SUCCESS"
    }
  ],
  nextScheduledMatches: [
    {
      id: 1,
      number: 1,
      teamAlpha: "T1",
      teamBeta: "DRX",
      scheduledAt: "2026-02-10T14:00:00Z"
    }
  ]
}
```

### ⚠️ Casos de Error
- Transición inválida → `BusinessRuleException: Cannot transition from X to Y`
- Requisitos no cumplidos → `ValidationException: Not enough teams checked in`
- Bracket no generado → `BusinessRuleException: Tournament bracket not generated`

---

## 🔟 REPORTES ANALÍTICOS AVANZADOS

### 📝 Descripción
Generar reportes complejos combinando múltiples entidades para análisis de negocio.

### 🎯 Reglas de Dominio

**Tipos de Reportes:**

### A) Reporte de Performance de Torneo
**Métricas:**
- 🔹 Total de equipos registrados vs capacidad
- 🔹 Tasa de check-in (checked in / approved)
- 🔹 Promedio de duración de partidos
- 🔹 Distribución de puntuaciones por fase
- 🔹 Top 10 jugadores por KDA
- 🔹 Top 5 equipos por win rate en el torneo
- 🔹 Total de kills/deaths/assists del torneo

### B) Reporte de Actividad de Jugador
**Métricas:**
- 🔹 Partidos jugados por mes
- 🔹 Tendencia de win rate (evolución temporal)
- 🔹 Performance por fase de torneo
- 🔹 Mejores compañeros de equipo (mayor win rate juntos)
- 🔹 Record contra equipos específicos

### C) Reporte Financiero de Transferencias
**Métricas:**
- 🔹 Total de transferencias por mes/año
- 🔹 Monto promedio de transferencias
- 🔹 Equipos que más gastan en transferencias
- 🔹 Equipos que más ganan vendiendo jugadores
- 🔹 Jugadores más valiosos (por fee de transferencia)

### 📥 Entrada Esperada
```typescript
{
  reportType: "TOURNAMENT_PERFORMANCE",
  tournamentId: 5,
  dateRange: {
    start: "2026-02-10",
    end: "2026-02-25"
  },
  includeCharts: true
}
```

### 📤 Salida Esperada (Reporte de Torneo)
```typescript
{
  tournament: {
    id: 5,
    name: "Worlds 2026",
    game: "League of Legends",
    status: "COMPLETED"
  },
  participation: {
    registeredTeams: 24,
    approvedTeams: 20,
    checkedInTeams: 18,
    capacity: 24,
    fillRate: 100,
    checkInRate: 90
  },
  matches: {
    totalMatches: 35,
    completedMatches: 35,
    averageDuration: "42 minutes",
    totalGamesPlayed: 89,  // Sum of all bestOf scores
    longestMatch: {
      id: 15,
      duration: "78 minutes",
      teams: ["T1", "GENG"]
    }
  },
  topPlayers: [
    {
      rank: 1,
      player: { id: 1, name: "Faker" },
      stats: {
        matchesPlayed: 12,
        kills: 156,
        deaths: 23,
        assists: 245,
        kda: 17.43,
        mvps: 7,
        winRate: 91.67
      }
    }
    // ... top 10
  ],
  topTeams: [
    {
      rank: 1,
      team: { id: 1, tag: "T1" },
      matchesPlayed: 12,
      wins: 11,
      losses: 1,
      winRate: 91.67,
      avgGameDuration: "38 minutes",
      totalKills: 234,
      finalStanding: 1,
      prizeWon: 1000000.00
    }
    // ... top 5
  ],
  phaseDistribution: {
    "QUARTERFINALS": { matches: 4, avgDuration: "41 min" },
    "SEMIFINALS": { matches: 2, avgDuration: "45 min" },
    "FINALS": { matches: 1, avgDuration: "52 min" }
  },
  aggregateStats: {
    totalKills: 3456,
    totalDeaths: 3456,
    totalAssists: 6789,
    avgKillsPerGame: 38.8,
    highestKillGame: 67
  },
  charts: {
    winRateByPhase: "base64_encoded_chart_image",
    kdaDistribution: "base64_encoded_chart_image"
  },
  generatedAt: "2026-02-26T10:00:00Z"
}
```

---

## 🎯 GUÍA DE IMPLEMENTACIÓN

### Orden Sugerido de Desarrollo:

1. **Básicos (Fundación):**
   - Caso 1: Registro de Jugador
   - Caso 2: Creación de Equipo

2. **Intermedios (Lógica de Negocio):**
   - Caso 3: Transferencias
   - Caso 4: Registro a Torneo
   - Caso 6: Ejecución de Partido

3. **Avanzados (Algoritmos Complejos):**
   - Caso 5: Generación de Bracket
   - Caso 9: Ciclo de Vida de Torneo
   - Caso 8: Sistema de Rankings

4. **Analíticos (Agregaciones y Reportes):**
   - Caso 7: Dashboard de Jugador
   - Caso 10: Reportes Analíticos

---

## 🛠️ HERRAMIENTAS Y TÉCNICAS A PRACTICAR

### Conceptos de Prisma:
- ✅ Transacciones (`$transaction`)
- ✅ Queries anidadas (`include`, `select`)
- ✅ Agregaciones (`_count`, `_avg`, `_sum`)
- ✅ Filtros complejos (`where`, `AND`, `OR`, `NOT`)
- ✅ Ordenamiento y paginación
- ✅ Upsert y operaciones condicionales
- ✅ Raw queries para cálculos complejos

### Patrones de Diseño:
- ✅ Repository Pattern
- ✅ Service Layer
- ✅ DTO (Data Transfer Objects)
- ✅ Mappers
- ✅ Validators
- ✅ Specification Pattern

### Testing:
- ✅ Unit tests con mocks de Prisma
- ✅ Integration tests con base de datos de prueba
- ✅ Test de reglas de negocio
- ✅ Test de validaciones

---

## 📚 RECURSOS ADICIONALES

- [Prisma Documentation](https://www.prisma.io/docs)
- [Prisma Best Practices](https://www.prisma.io/docs/guides/performance-and-optimization)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)

---

**¡Buena suerte con la práctica! 🚀**
