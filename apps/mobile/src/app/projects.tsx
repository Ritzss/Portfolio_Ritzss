import { useState } from 'react';
import { Linking, Pressable, ScrollView, StyleSheet, View, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { projects } from '@portfolio/content';
import { Colors, MaxContentWidth, Spacing } from '@/constants/theme';
import { ThemedText } from '@/components/themed-text';

export default function ProjectsScreen() {
  const scheme = useColorScheme();
  const theme = Colors[scheme === 'dark' ? 'dark' : 'light'];
  const [expanded, setExpanded] = useState<string | null>(null);
  const openLink = (url?: string) => { if (url) void Linking.openURL(url); };

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.background }]} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <ThemedText style={[styles.eyebrow, { color: theme.accent }]}>SELECTED WORK / 02</ThemedText>
          <ThemedText style={[styles.title, { color: theme.text }]}>Things I&apos;ve built.</ThemedText>
          <ThemedText style={[styles.body, { color: theme.textSecondary }]}>Real products, useful workflows, and the engineering behind them.</ThemedText>
          <View style={styles.statRow}>
            <View style={[styles.stat, { backgroundColor: theme.backgroundElement, borderColor: theme.border }]}><ThemedText style={[styles.statNumber, { color: theme.accent }]}>{String(projects.length).padStart(2, '0')}</ThemedText><ThemedText style={[styles.statLabel, { color: theme.textSecondary }]}>PROJECTS</ThemedText></View>
            <View style={[styles.stat, { backgroundColor: theme.backgroundElement, borderColor: theme.border }]}><ThemedText style={[styles.statNumber, { color: theme.accent }]}>FULL</ThemedText><ThemedText style={[styles.statLabel, { color: theme.textSecondary }]}>STACK FOCUS</ThemedText></View>
          </View>
        </View>

        {projects.map((project, index) => {
          const isOpen = expanded === project.title;
          return (
            <View key={project.title} style={[styles.card, { backgroundColor: theme.backgroundElement, borderColor: theme.border }]}>
              <View style={styles.cardTop}><ThemedText style={[styles.index, { color: theme.accent }]}>{String(index + 1).padStart(2, '0')}</ThemedText><View style={{ flex: 1 }} />{project.featured && <View style={[styles.featured, { backgroundColor: theme.backgroundSelected }]}><ThemedText style={[styles.featuredText, { color: theme.accent }]}>FEATURED</ThemedText></View>}</View>
              <ThemedText style={[styles.projectTitle, { color: theme.text }]}>{project.title}</ThemedText>
              {!!project.subTitle && <ThemedText style={[styles.subtitle, { color: theme.accent }]}>{project.subTitle}</ThemedText>}
              <ThemedText style={[styles.body, { color: theme.textSecondary }]}>{project.description}</ThemedText>
              {!!project.technologies?.length && <View style={styles.tags}>{project.technologies.map((tech) => <View key={tech} style={[styles.tag, { borderColor: theme.border }]}><ThemedText style={[styles.tagText, { color: theme.text }]}>{tech}</ThemedText></View>)}</View>}
              <Pressable accessibilityRole="button" onPress={() => setExpanded(isOpen ? null : project.title)} style={[styles.action, { borderColor: theme.border }]}><ThemedText style={[styles.actionText, { color: theme.accent }]}>{isOpen ? 'HIDE PROJECT DETAILS −' : 'PROJECT DETAILS +'}</ThemedText></Pressable>
              {isOpen && <View style={styles.details}>
                {!!project.highlights?.length && <><ThemedText style={[styles.detailHeading, { color: theme.text }]}>WHAT I BUILT</ThemedText>{project.highlights.map((item) => <View key={item} style={styles.bulletRow}><ThemedText style={[styles.bullet, { color: theme.accent }]}>↳</ThemedText><ThemedText style={[styles.body, { color: theme.textSecondary, flex: 1 }]}>{item}</ThemedText></View>)}</>}
                <View style={styles.links}>
                  {!!project.url && <Pressable onPress={() => openLink(project.url)} style={[styles.linkButton, { backgroundColor: theme.accent }]}><ThemedText style={styles.linkButtonText}>OPEN PROJECT ↗</ThemedText></Pressable>}
                  {!!project.github && <Pressable onPress={() => openLink(project.github)} style={[styles.linkButton, { borderColor: theme.border, borderWidth: 1 }]}><ThemedText style={[styles.linkButtonText, { color: theme.text }]}>SOURCE CODE ↗</ThemedText></Pressable>}
                  {!project.url && !project.github && <ThemedText style={[styles.body, { color: theme.textSecondary }]}>This project has no public link listed.</ThemedText>}
                </View>
              </View>}
            </View>
          );
        })}
        <ThemedText style={[styles.footer, { color: theme.textSecondary }]}>GOOD SOFTWARE IS MORE THAN A PRETTY SCREEN.</ThemedText>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 }, content: { width: '100%', maxWidth: MaxContentWidth, alignSelf: 'center', paddingHorizontal: Spacing.four, paddingTop: Spacing.two, paddingBottom: 112, gap: 16 },
  hero: { paddingTop: 24, paddingBottom: 12, gap: 12 }, eyebrow: { fontSize: 10, fontWeight: '900', letterSpacing: 2 }, title: { fontSize: 38, lineHeight: 42, fontWeight: '900', letterSpacing: -1.5 }, body: { fontSize: 13, lineHeight: 20 },
  statRow: { flexDirection: 'row', gap: 10, marginTop: 8 }, stat: { flex: 1, borderWidth: 1, borderRadius: 14, padding: 14, gap: 4 }, statNumber: { fontSize: 24, fontWeight: '900' }, statLabel: { fontSize: 9, fontWeight: '900', letterSpacing: 1.3 },
  card: { borderWidth: 1, borderRadius: 18, padding: 17, gap: 11 }, cardTop: { flexDirection: 'row', alignItems: 'center', gap: 8 }, index: { fontSize: 12, fontWeight: '900', letterSpacing: 1 }, featured: { paddingHorizontal: 8, paddingVertical: 5, borderRadius: 6 }, featuredText: { fontSize: 9, fontWeight: '900', letterSpacing: 1 }, projectTitle: { fontSize: 25, lineHeight: 29, fontWeight: '900', letterSpacing: -0.6 }, subtitle: { fontSize: 12, fontWeight: '800' },
  tags: { flexDirection: 'row', flexWrap: 'wrap', gap: 7, marginTop: 3 }, tag: { borderWidth: 1, borderRadius: 7, paddingVertical: 6, paddingHorizontal: 8 }, tagText: { fontSize: 10, fontWeight: '700' }, action: { borderTopWidth: 1, paddingTop: 13, marginTop: 2 }, actionText: { fontSize: 10, fontWeight: '900', letterSpacing: 0.8 }, details: { gap: 10, paddingTop: 5 }, detailHeading: { fontSize: 10, fontWeight: '900', letterSpacing: 1.5 }, bulletRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 8 }, bullet: { fontSize: 15, fontWeight: '900', lineHeight: 19 }, links: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 4 }, linkButton: { paddingVertical: 10, paddingHorizontal: 12, borderRadius: 9 }, linkButtonText: { color: '#0B0B0D', fontSize: 10, fontWeight: '900', letterSpacing: 0.4 }, footer: { textAlign: 'center', fontSize: 9, fontWeight: '800', letterSpacing: 1.1, paddingVertical: 24 },
});
