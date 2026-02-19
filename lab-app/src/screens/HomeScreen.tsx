import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { colors, spacing } from '../theme';
import { researchDirections } from '../data/research';
import { people } from '../data/people';
import { publications } from '../data/publications';
import { news } from '../data/news';

interface HomeScreenProps {
  navigation: any;
}

const homeImages = [require('../../assets/home/slide-1.png'), require('../../assets/home/slide-2.png')];

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const featured = researchDirections.slice(0, 2);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.hero}>
        <Text style={styles.title}>微纳气泡实验室</Text>
        <Text style={styles.subTitle}>Tianjin University · Environmental Science & Engineering</Text>
        <Text style={styles.desc}>面向水环境治理的机理研究与工程转化</Text>
      </View>

      <View style={styles.heroImageWrap}>
        <Image source={homeImages[0]} style={styles.heroImageLarge} resizeMode="cover" />
        <View style={styles.heroImageRow}>
          <Image source={homeImages[1]} style={styles.heroImageSmall} resizeMode="cover" />
          <Image source={homeImages[0]} style={styles.heroImageSmall} resizeMode="cover" />
        </View>
      </View>

      <View style={styles.metricsRow}>
        <View style={styles.metricCard}>
          <Text style={styles.metricNum}>{researchDirections.length}</Text>
          <Text style={styles.metricLabel}>研究方向</Text>
        </View>
        <View style={styles.metricCard}>
          <Text style={styles.metricNum}>{publications.length}+</Text>
          <Text style={styles.metricLabel}>论文</Text>
        </View>
        <View style={styles.metricCard}>
          <Text style={styles.metricNum}>{people.length}+</Text>
          <Text style={styles.metricLabel}>成员</Text>
        </View>
      </View>

      <View style={styles.quickRow}>
        <TouchableOpacity style={styles.quickBtn} onPress={() => navigation.navigate('People')}>
          <Text style={styles.quickText}>团队成员</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quickBtn} onPress={() => navigation.navigate('Research')}>
          <Text style={styles.quickText}>研究方向</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quickBtn} onPress={() => navigation.navigate('Industrial')}>
          <Text style={styles.quickText}>产业基地</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>精选方向</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Research')}>
          <Text style={styles.sectionAction}>全部</Text>
        </TouchableOpacity>
      </View>

      {featured.map((item) => (
        <TouchableOpacity
          key={item.slug}
          style={styles.featureCard}
          activeOpacity={0.86}
          onPress={() => navigation.navigate('ResearchDetail', { slug: item.slug })}
        >
          <Text style={styles.featureTitle}>{item.titleZh}</Text>
          <Text style={styles.featureBrief} numberOfLines={2}>{item.briefZh}</Text>
          <Text style={styles.featureLink}>查看详情 →</Text>
        </TouchableOpacity>
      ))}

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>最新新闻</Text>
      </View>

      {news.slice(0, 3).map((n) => (
        <View key={n.id} style={styles.newsCard}>
          <View style={styles.newsDateWrap}>
            <Text style={styles.newsDate}>{n.date}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.newsTitle} numberOfLines={2}>{n.titleZh}</Text>
            {!!n.titleEn && <Text style={styles.newsEn} numberOfLines={1}>{n.titleEn}</Text>}
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f6f8fb' },
  content: { padding: spacing.md, paddingBottom: spacing.xl },
  hero: {
    backgroundColor: '#0f172a',
    borderRadius: 18,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  title: { color: '#fff', fontSize: 26, fontWeight: '700' },
  subTitle: { color: 'rgba(255,255,255,0.8)', fontSize: 12, marginTop: 4 },
  desc: { color: 'rgba(255,255,255,0.92)', fontSize: 14, marginTop: 10, lineHeight: 22 },
  heroImageWrap: { marginBottom: spacing.md },
  heroImageLarge: { width: '100%', height: 160, borderRadius: 14, marginBottom: 8 },
  heroImageRow: { flexDirection: 'row', gap: 8 },
  heroImageSmall: { flex: 1, height: 90, borderRadius: 12 },
  metricsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.md },
  metricCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 14,
    paddingVertical: 14,
    marginHorizontal: 4,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#eef2f7',
  },
  metricNum: { fontSize: 22, fontWeight: '700', color: '#0f172a' },
  metricLabel: { marginTop: 2, fontSize: 12, color: '#64748b' },
  quickRow: { flexDirection: 'row', marginBottom: spacing.md },
  quickBtn: {
    flex: 1,
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#dbe2ea',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
  },
  quickText: { fontSize: 13, color: '#334155', fontWeight: '600' },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, marginTop: 4 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#0f172a' },
  sectionAction: { color: colors.primary, fontWeight: '600', fontSize: 13 },
  featureCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: '#eef2f7',
  },
  featureTitle: { fontSize: 16, fontWeight: '700', color: '#111827' },
  featureBrief: { marginTop: 8, fontSize: 13, lineHeight: 20, color: '#475569' },
  featureLink: { marginTop: 10, fontSize: 13, color: '#2563eb', fontWeight: '600' },
  newsCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: '#eef2f7',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  newsDateWrap: {
    backgroundColor: '#eff6ff',
    borderWidth: 1,
    borderColor: '#dbeafe',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 10,
  },
  newsDate: { fontSize: 11, color: '#1d4ed8', fontWeight: '700' },
  newsTitle: { fontSize: 14, lineHeight: 20, color: '#111827', fontWeight: '600' },
  newsEn: { marginTop: 4, fontSize: 12, color: '#64748b' },
});
