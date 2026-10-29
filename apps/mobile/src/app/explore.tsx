import { useState, type ReactNode } from 'react';
import { Linking, Pressable, ScrollView, StyleSheet, View, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { capabilities, certifications, beyond, education, experience, skillGroups, socialLinks } from '@portfolio/content';
import { Colors, MaxContentWidth, Spacing } from '@/constants/theme';
import { ThemedText } from '@/components/themed-text';

function SectionHeading({ label, title, theme }: { label: string; title: string; theme: (typeof Colors)['light'] | (typeof Colors)['dark'] }) {
  return <View style={styles.sectionHeading}><ThemedText style={[styles.label, { color: theme.accent }]}>{label.toUpperCase()}</ThemedText><ThemedText style={[styles.heading, { color: theme.text }]}>{title}</ThemedText></View>;
}

function DataCard({ children, theme }: { children: ReactNode; theme: (typeof Colors)['light'] | (typeof Colors)['dark'] }) {
  return <View style={[styles.card, { backgroundColor: theme.backgroundElement, borderColor: theme.border }]}>{children}</View>;
}

function BulletList({ items, color }: { items: string[]; color: string }) {
  return <View style={styles.bulletList}>{items.map((item, index) => <View key={`${index}-${item}`} style={styles.bulletRow}><ThemedText style={[styles.bullet, { color }]}>↳</ThemedText><ThemedText style={[styles.body, { color }]}>{item}</ThemedText></View>)}</View>;
}

export default function ExploreScreen() {
  const scheme = useColorScheme();
  const theme = Colors[scheme === 'dark' ? 'dark' : 'light'];
  const [expandedCode, setExpandedCode] = useState<string | null>(null);
  const openLink = (url: string) => void Linking.openURL(url);

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.background }]} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.intro}>
          <ThemedText style={[styles.label, { color: theme.accent }]}>THE FULL PICTURE / 02</ThemedText>
          <ThemedText style={[styles.pageTitle, { color: theme.text }]}>More than a screen.</ThemedText>
          <ThemedText style={[styles.body, { color: theme.textSecondary }]}>Experience, skills, education, technical deep-dives and the things I explore beyond software. All portfolio content lives in the shared content package.</ThemedText>
        </View>

        <SectionHeading label="01 / Career" title="Experience" theme={theme} />
        {experience.map((item) => <DataCard key={`${item.company}-${item.role}`} theme={theme}>
          <ThemedText style={[styles.cardTitle, { color: theme.text }]}>{item.role}</ThemedText>
          <ThemedText style={[styles.accentText, { color: theme.accent }]}>{item.company}</ThemedText>
          <ThemedText style={[styles.meta, { color: theme.textSecondary }]}>{item.startDate} – {item.endDate ?? 'Present'}{item.location ? `  ·  ${item.location}` : ''}</ThemedText>
          <BulletList items={item.description} color={theme.textSecondary} />
          <View style={styles.tags}>{item.technologies.map((tech) => <View key={tech} style={[styles.tag, { borderColor: theme.border }]}><ThemedText style={[styles.tagText, { color: theme.text }]}>{tech}</ThemedText></View>)}</View>
        </DataCard>)}

        <SectionHeading label="02 / Learning" title="Education" theme={theme} />
        {education.map((item) => <DataCard key={item.institution} theme={theme}>
          <ThemedText style={[styles.cardTitle, { color: theme.text }]}>{item.degree}</ThemedText>
          <ThemedText style={[styles.accentText, { color: theme.accent }]}>{item.institution}</ThemedText>
          <ThemedText style={[styles.meta, { color: theme.textSecondary }]}>{item.field} · {item.startDate} – {item.endDate}{item.grade ? ` · ${item.grade}` : ''}</ThemedText>
          {!!item.description?.length && <BulletList items={item.description} color={theme.textSecondary} />}
        </DataCard>)}

        <SectionHeading label="03 / Credentials" title="Certifications" theme={theme} />
        {certifications.map((item) => <DataCard key={`${item.name}-${item.issuer}`} theme={theme}>
          <ThemedText style={[styles.cardTitle, { color: theme.text }]}>{item.name}</ThemedText>
          <ThemedText style={[styles.accentText, { color: theme.accent }]}>{item.issuer}</ThemedText>
          <ThemedText style={[styles.meta, { color: theme.textSecondary }]}>Issued {item.issueDate}{item.credentialId ? ` · ID ${item.credentialId}` : ''}</ThemedText>
          {!!item.description?.length && <BulletList items={item.description} color={theme.textSecondary} />}
          {!!item.skills?.length && <View style={styles.tags}>{item.skills.map((skill) => <View key={skill} style={[styles.tag, { borderColor: theme.border }]}><ThemedText style={[styles.tagText, { color: theme.text }]}>{skill}</ThemedText></View>)}</View>}
        </DataCard>)}

        <SectionHeading label="04 / Toolkit" title="Skills" theme={theme} />
        {skillGroups.map((group) => <DataCard key={group.label} theme={theme}>
          <ThemedText style={[styles.cardTitle, { color: theme.text }]}>{group.label}</ThemedText>
          <View style={styles.tags}>{group.children.map((skill) => <View key={skill.value} style={[styles.tag, { borderColor: theme.border }]}><ThemedText style={[styles.tagText, { color: theme.text }]}>{skill.label}</ThemedText></View>)}</View>
        </DataCard>)}

        <SectionHeading label="05 / Engineering" title="What I build" theme={theme} />
        {capabilities.map((item) => {
          const expanded = expandedCode === item.number;
          return <DataCard key={item.number} theme={theme}>
            <View style={styles.capabilityTop}><ThemedText style={[styles.number, { color: theme.accent }]}>{item.number}</ThemedText><View style={{ flex: 1 }} /><Pressable onPress={() => setExpandedCode(expanded ? null : item.number)}><ThemedText style={[styles.toggle, { color: theme.accent }]}>{expanded ? 'HIDE CODE −' : 'VIEW CODE +'}</ThemedText></Pressable></View>
            <ThemedText style={[styles.cardTitle, { color: theme.text }]}>{item.title}</ThemedText>
            <ThemedText style={[styles.body, { color: theme.textSecondary }]}>{item.description}</ThemedText>
            {expanded && <View style={[styles.codePanel, { backgroundColor: '#101012', borderColor: '#34343A' }]}><ThemedText selectable style={styles.codeText}>{'code' in item ? String(item.code) : 'Code example not available for this capability.'}</ThemedText></View>}
          </DataCard>;
        })}

        <SectionHeading label="06 / Off the clock" title={beyond.intro.title} theme={theme} />
        <DataCard theme={theme}>
          <ThemedText style={[styles.label, { color: theme.accent }]}>{beyond.intro.eyebrow}</ThemedText>
          <ThemedText style={[styles.body, { color: theme.textSecondary }]}>{beyond.intro.description}</ThemedText>
          {beyond.interests.map((interest) => <View key={interest.id} style={[styles.interest, { borderTopColor: theme.border }]}>
            <View style={styles.interestHeader}><ThemedText style={[styles.number, { color: theme.accent }]}>{interest.number}</ThemedText><ThemedText style={[styles.cardTitle, { color: theme.text, flex: 1 }]}>{interest.title}</ThemedText></View>
            <ThemedText style={[styles.body, { color: theme.textSecondary }]}>{interest.description}</ThemedText>
            {!!interest.media?.length && <View style={styles.mediaList}>{interest.media.map((media) => <View key={`${media.type}-${media.tmdbId}`} style={[styles.mediaItem, { borderColor: theme.border }]}><ThemedText style={[styles.mediaType, { color: theme.accent }]}>{media.type.toUpperCase()}</ThemedText><ThemedText style={[styles.mediaTitle, { color: theme.text }]}>{media.title}</ThemedText></View>)}</View>}
          </View>)}
        </DataCard>

        <SectionHeading label="07 / In progress" title="Currently exploring" theme={theme} />
        {beyond.currentlyExploring.map((item) => <DataCard key={item.id} theme={theme}>
          <ThemedText style={[styles.cardTitle, { color: theme.text }]}>{item.title}</ThemedText>
          <ThemedText style={[styles.body, { color: theme.textSecondary }]}>{item.description}</ThemedText>
          <View style={styles.tags}>{item.focus.map((focus) => <View key={focus} style={[styles.tag, { borderColor: theme.border }]}><ThemedText style={[styles.tagText, { color: theme.text }]}>{focus}</ThemedText></View>)}</View>
        </DataCard>)}

        <DataCard theme={theme}>
          <ThemedText style={[styles.label, { color: theme.accent }]}>{beyond.personalNote.eyebrow}</ThemedText>
          <ThemedText style={[styles.noteTitle, { color: theme.text }]}>{beyond.personalNote.title}</ThemedText>
        </DataCard>

        <SectionHeading label="08 / Elsewhere" title="Find me online" theme={theme} />
        <DataCard theme={theme}>
          {socialLinks.map((link) => <Pressable key={link.platform} onPress={() => openLink(link.url)} style={[styles.socialRow, { borderBottomColor: theme.border }]}><ThemedText style={[styles.cardTitle, { color: theme.text }]}>{link.label ?? link.platform}</ThemedText><View style={{ flex: 1 }} /><ThemedText style={[styles.accentText, { color: theme.accent }]}>OPEN ↗</ThemedText></Pressable>)}
        </DataCard>
        <ThemedText style={[styles.footer, { color: theme.textSecondary }]}>BUILT WITH CURIOSITY. STYLED IN ORANGE.</ThemedText>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  content: { width: '100%', maxWidth: MaxContentWidth, alignSelf: 'center', paddingHorizontal: Spacing.four, paddingTop: Spacing.two, paddingBottom: 112, gap: Spacing.three },
  intro: { paddingTop: 24, paddingBottom: 20, gap: 12 },
  label: { fontSize: 10, fontWeight: '900', letterSpacing: 2 },
  pageTitle: { fontSize: 38, lineHeight: 42, fontWeight: '900', letterSpacing: -1.5 },
  body: { fontSize: 13, lineHeight: 20 },
  sectionHeading: { marginTop: 22, marginBottom: 2, gap: 7 },
  heading: { fontSize: 28, lineHeight: 32, fontWeight: '900', letterSpacing: -0.8 },
  card: { borderWidth: 1, borderRadius: 17, padding: 17, gap: 11 },
  cardTitle: { fontSize: 17, lineHeight: 22, fontWeight: '900' },
  accentText: { fontSize: 12, fontWeight: '800' },
  meta: { fontSize: 11, lineHeight: 17, fontWeight: '600' },
  bulletList: { gap: 8, marginTop: 2 },
  bulletRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 8 },
  bullet: { fontSize: 15, fontWeight: '900', lineHeight: 19 },
  tags: { flexDirection: 'row', flexWrap: 'wrap', gap: 7, marginTop: 3 },
  tag: { borderWidth: 1, borderRadius: 7, paddingVertical: 6, paddingHorizontal: 8 },
  tagText: { fontSize: 10, fontWeight: '700' },
  capabilityTop: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  number: { fontSize: 12, fontWeight: '900', letterSpacing: 1 },
  toggle: { fontSize: 10, fontWeight: '900', letterSpacing: 0.8 },
  codePanel: { borderWidth: 1, borderRadius: 10, padding: 12, marginTop: 3 },
  codeText: { color: '#F5F5F5', fontSize: 10, lineHeight: 16, fontFamily: 'monospace' },
  interest: { borderTopWidth: 1, paddingTop: 13, marginTop: 4, gap: 7 },
  interestHeader: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  mediaList: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 3 },
  mediaItem: { borderWidth: 1, borderRadius: 7, paddingVertical: 6, paddingHorizontal: 8, maxWidth: '100%' },
  mediaType: { fontSize: 8, fontWeight: '900', letterSpacing: 1 },
  mediaTitle: { fontSize: 11, fontWeight: '700', marginTop: 2 },
  noteTitle: { fontSize: 23, lineHeight: 29, fontWeight: '900', letterSpacing: -0.6 },
  socialRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 13, borderBottomWidth: 1 },
  footer: { textAlign: 'center', fontSize: 9, letterSpacing: 1.2, fontWeight: '800', paddingVertical: 24 },
});
