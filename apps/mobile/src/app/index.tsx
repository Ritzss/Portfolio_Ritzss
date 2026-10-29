import { useMemo } from "react";
import {
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
  useColorScheme,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  about,
  contact,
  profile,
  projects,
  socialLinks,
} from "@portfolio/content";
import { Colors, MaxContentWidth, Palette, Spacing } from "@/constants/theme";
import { ThemedText } from "@/components/themed-text";
import SwipeableTabScreen from "@/components/swipeable-tab-screen";

export default function HomeScreen() {
  const scheme = useColorScheme();
  const theme = Colors[scheme === "dark" ? "dark" : "light"];
  const featuredProjects = useMemo(
    () => projects.filter((project) => project.featured),
    [],
  );

  const openLink = (url?: string) => {
    if (url) void Linking.openURL(url);
  };

  return (
    <SwipeableTabScreen>
      <SafeAreaView
        style={[styles.safe, { backgroundColor: theme.background }]}
        edges={["top"]}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.topline}>
            <View
              style={[styles.statusDot, { backgroundColor: theme.accent }]}
            />
            <ThemedText
              style={[styles.eyebrow, { color: theme.textSecondary }]}
            >
              PORTFOLIO / 2026
            </ThemedText>
            <View style={{ flex: 1 }} />
            <ThemedText style={[styles.monogram, { color: theme.accent }]}>
              RB.
            </ThemedText>
          </View>

          <View style={styles.hero}>
            <ThemedText style={[styles.kicker, { color: theme.accent }]}>
              HELLO, I&apos;M
            </ThemedText>
            <ThemedText style={[styles.name, { color: theme.text }]}>
              {profile.name}
            </ThemedText>
            <ThemedText style={[styles.role, { color: theme.textSecondary }]}>
              {profile.role}
            </ThemedText>
            <ThemedText style={[styles.tagline, { color: theme.text }]}>
              {profile.tagline}
            </ThemedText>
            <View style={styles.ctaRow}>
              <Pressable
                onPress={() => openLink(`mailto:${contact.email}`)}
                style={({ pressed }) => [
                  styles.primaryButton,
                  {
                    backgroundColor: theme.accent,
                    opacity: pressed ? 0.75 : 1,
                  },
                ]}
              >
                <ThemedText
                  style={[styles.primaryButtonText, { color: theme.onAccent }]}
                >
                  LET&apos;S TALK ↗
                </ThemedText>
              </Pressable>
              <Pressable
                onPress={() =>
                  openLink(
                    socialLinks.find((link) => link.platform === "GitHub")?.url,
                  )
                }
                style={({ pressed }) => [
                  styles.secondaryButton,
                  { borderColor: theme.border, opacity: pressed ? 0.65 : 1 },
                ]}
              >
                <ThemedText style={{ color: theme.text, fontWeight: "700" }}>
                  GITHUB ↗
                </ThemedText>
              </Pressable>
            </View>
          </View>

          <View
            style={[
              styles.stackPanel,
              {
                backgroundColor: theme.backgroundElement,
                borderColor: theme.border,
              },
            ]}
          >
            <ThemedText style={[styles.sectionLabel, { color: theme.accent }]}>
              MY EVERYDAY TOOLKIT
            </ThemedText>
            <View style={styles.chipWrap}>
              {profile.stack.map((item) => (
                <View
                  key={item}
                  style={[styles.chip, { borderColor: theme.border }]}
                >
                  <ThemedText style={[styles.chipText, { color: theme.text }]}>
                    {item}
                  </ThemedText>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.sectionHeader}>
            <View>
              <ThemedText
                style={[styles.sectionLabel, { color: theme.accent }]}
              >
                SELECTED WORK
              </ThemedText>
              <ThemedText style={[styles.sectionTitle, { color: theme.text }]}>
                Things I&apos;ve built.
              </ThemedText>
            </View>
            <ThemedText style={[styles.count, { color: theme.textSecondary }]}>
              {String(projects.length).padStart(2, "0")} PROJECTS
            </ThemedText>
          </View>

          {featuredProjects.map((project, index) => (
            <View
              key={project.title}
              style={[
                styles.projectCard,
                {
                  backgroundColor: theme.backgroundElement,
                  borderColor: theme.border,
                },
              ]}
            >
              <View style={styles.projectTop}>
                <ThemedText
                  style={[styles.projectNumber, { color: theme.accent }]}
                >
                  {String(index + 1).padStart(2, "0")}
                </ThemedText>
                <View style={{ flex: 1 }} />
                {project.featured && (
                  <View
                    style={[
                      styles.featuredBadge,
                      { backgroundColor: theme.backgroundSelected },
                    ]}
                  >
                    <ThemedText
                      style={[styles.featuredText, { color: theme.accent }]}
                    >
                      FEATURED
                    </ThemedText>
                  </View>
                )}
              </View>
              <ThemedText style={[styles.projectTitle, { color: theme.text }]}>
                {project.title}
              </ThemedText>
              {!!project.subTitle && (
                <ThemedText
                  style={[styles.projectSubtitle, { color: theme.accent }]}
                >
                  {project.subTitle}
                </ThemedText>
              )}
              <ThemedText
                style={[styles.description, { color: theme.textSecondary }]}
                numberOfLines={4}
              >
                {project.description}
              </ThemedText>
              <View style={styles.chipWrap}>
                {project.technologies.slice(0, 5).map((technology) => (
                  <View
                    key={technology}
                    style={[styles.smallChip, { borderColor: theme.border }]}
                  >
                    <ThemedText
                      style={[styles.smallChipText, { color: theme.text }]}
                    >
                      {technology}
                    </ThemedText>
                  </View>
                ))}
              </View>
              <View style={styles.linkRow}>
                {project.url && (
                  <Pressable onPress={() => openLink(project.url)}>
                    <ThemedText
                      style={[styles.linkText, { color: theme.accent }]}
                    >
                      LIVE PROJECT ↗
                    </ThemedText>
                  </Pressable>
                )}
                {project.github && (
                  <Pressable onPress={() => openLink(project.github)}>
                    <ThemedText
                      style={[styles.linkText, { color: theme.text }]}
                    >
                      SOURCE CODE ↗
                    </ThemedText>
                  </Pressable>
                )}
              </View>
            </View>
          ))}

          <View
            style={[
              styles.aboutCard,
              {
                backgroundColor: theme.backgroundElement,
                borderColor: theme.border,
              },
            ]}
          >
            <ThemedText style={[styles.sectionLabel, { color: theme.accent }]}>
              {about.eyebrow.toUpperCase()}
            </ThemedText>
            <ThemedText style={[styles.sectionTitle, { color: theme.text }]}>
              {about.heading}
            </ThemedText>
            {about.paragraphs.map((paragraph, index) => (
              <ThemedText
                key={index}
                style={[styles.description, { color: theme.textSecondary }]}
              >
                {paragraph}
              </ThemedText>
            ))}
            <ThemedText style={[styles.closing, { color: theme.text }]}>
              {about.closingStatement}
            </ThemedText>
          </View>

          <View style={[styles.contactCard, { backgroundColor: theme.accent }]}>
            <ThemedText style={[styles.sectionLabel, { color: Palette.black }]}>
              HAVE A GOOD PROBLEM?
            </ThemedText>
            <ThemedText style={[styles.contactTitle, { color: Palette.black }]}>
              {contact.heading}
            </ThemedText>
            <ThemedText
              style={[styles.contactDescription, { color: "#2A160B" }]}
            >
              {contact.description}
            </ThemedText>
            <Pressable
              onPress={() => openLink(`mailto:${contact.email}`)}
              style={styles.emailButton}
            >
              <ThemedText style={styles.emailButtonText}>
                {contact.email} ↗
              </ThemedText>
            </Pressable>
          </View>

          <View style={styles.footer}>
            {socialLinks.map((link) => (
              <Pressable key={link.platform} onPress={() => openLink(link.url)}>
                <ThemedText style={[styles.footerLink, { color: theme.text }]}>
                  {link.label ?? link.platform} ↗
                </ThemedText>
              </Pressable>
            ))}
            <ThemedText
              style={[styles.footerNote, { color: theme.textSecondary }]}
            >
              DESIGNED & BUILT BY {profile.name.toUpperCase()}
            </ThemedText>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SwipeableTabScreen>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  content: {
    width: "100%",
    maxWidth: MaxContentWidth,
    alignSelf: "center",
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.two,
    paddingBottom: 112,
    gap: Spacing.four,
  },
  topline: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 8,
  },
  statusDot: { width: 8, height: 8, borderRadius: 4 },
  eyebrow: { fontSize: 10, letterSpacing: 2, fontWeight: "800" },
  monogram: { fontSize: 22, fontWeight: "900", letterSpacing: -1 },
  hero: { paddingTop: 30, paddingBottom: 18, gap: 12 },
  kicker: { fontSize: 12, fontWeight: "900", letterSpacing: 3 },
  name: { fontSize: 43, lineHeight: 47, fontWeight: "900", letterSpacing: -2 },
  role: { fontSize: 15, fontWeight: "600" },
  tagline: {
    fontSize: 22,
    lineHeight: 29,
    fontWeight: "700",
    marginTop: 8,
    maxWidth: 420,
  },
  ctaRow: { flexDirection: "row", flexWrap: "wrap", gap: 10, marginTop: 14 },
  primaryButton: {
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 18,
  },
  primaryButtonText: { fontWeight: "900", letterSpacing: 0.7 },
  secondaryButton: {
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 18,
  },
  stackPanel: { borderWidth: 1, borderRadius: 18, padding: 18, gap: 14 },
  sectionLabel: { fontSize: 10, fontWeight: "900", letterSpacing: 2 },
  chipWrap: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  chip: {
    borderWidth: 1,
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  chipText: { fontSize: 12, fontWeight: "700" },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    gap: 10,
    marginTop: 18,
  },
  sectionTitle: {
    fontSize: 27,
    lineHeight: 32,
    fontWeight: "900",
    letterSpacing: -0.8,
    marginTop: 7,
  },
  count: { fontSize: 9, fontWeight: "800", letterSpacing: 1 },
  projectCard: { borderWidth: 1, borderRadius: 18, padding: 18, gap: 11 },
  projectTop: { flexDirection: "row", alignItems: "center" },
  projectNumber: { fontSize: 12, fontWeight: "900", letterSpacing: 1 },
  featuredBadge: { borderRadius: 6, paddingVertical: 5, paddingHorizontal: 8 },
  featuredText: { fontSize: 9, fontWeight: "900", letterSpacing: 1 },
  projectTitle: { fontSize: 24, fontWeight: "900", letterSpacing: -0.7 },
  projectSubtitle: { fontSize: 12, fontWeight: "800", letterSpacing: 0.4 },
  description: { fontSize: 13, lineHeight: 20 },
  smallChip: {
    borderWidth: 1,
    borderRadius: 6,
    paddingVertical: 5,
    paddingHorizontal: 8,
  },
  smallChipText: { fontSize: 10, fontWeight: "700" },
  linkRow: { flexDirection: "row", flexWrap: "wrap", gap: 18, marginTop: 5 },
  linkText: { fontSize: 10, fontWeight: "900", letterSpacing: 0.8 },
  aboutCard: { borderWidth: 1, borderRadius: 18, padding: 20, gap: 12 },
  closing: { fontSize: 14, lineHeight: 21, fontWeight: "800", marginTop: 4 },
  contactCard: { borderRadius: 20, padding: 22, gap: 12 },
  contactTitle: {
    fontSize: 29,
    lineHeight: 33,
    fontWeight: "900",
    letterSpacing: -1,
  },
  contactDescription: { fontSize: 13, lineHeight: 20 },
  emailButton: {
    alignSelf: "flex-start",
    borderWidth: 1,
    borderColor: "#2A160B",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginTop: 5,
  },
  emailButtonText: { color: "#0B0B0D", fontSize: 12, fontWeight: "900" },
  footer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 16,
    paddingVertical: 10,
  },
  footerLink: { fontSize: 11, fontWeight: "800" },
  footerNote: {
    width: "100%",
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 1.1,
    marginTop: 6,
  },
});
