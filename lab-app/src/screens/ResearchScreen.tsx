import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, spacing, fontSize } from '../theme';
import { researchDirections } from '../data/research';

interface ResearchScreenProps {
  navigation: any;
}

const colorMap = ['#2563eb', '#0f766e', '#7c3aed', '#ea580c', '#334155'];

export default function ResearchScreen({ navigation }: ResearchScreenProps) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.topCard}>
        <Text style={styles.pageTitle}>研究方向</Text>
        <Text style={styles.pageSub}>聚焦机理突破与工程应用，点击卡片查看详情</Text>
      </View>

      {researchDirections.map((item, index) => (
        <TouchableOpacity
          key={item.slug}
          style={styles.card}
          activeOpacity={0.86}
          onPress={() => navigation.navigate('ResearchDetail', { slug: item.slug })}
        >
          <View style={styles.cardHead}>
            <View style={[styles.dot, { backgroundColor: colorMap[index % colorMap.length] }]} />
            <Text style={styles.title}>{item.titleZh}</Text>
          </View>
          {!!item.category && <Text style={styles.meta}>{item.category}</Text>}
          <Text style={styles.brief} numberOfLines={2}>{item.briefZh}</Text>
          <View style={styles.footerRow}>
            <Text style={styles.groupTag}>{item.group === 'Core' ? '核心方向' : '应用方向'}</Text>
            <Text style={styles.link}>查看详情 →</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f6f8fb' },
  content: { padding: spacing.md, paddingBottom: spacing.xl },
  topCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: '#eef2f7',
  },
  pageTitle: { fontSize: 24, fontWeight: '700', color: '#111827' },
  pageSub: { marginTop: 6, color: '#64748b', fontSize: 13, lineHeight: 20 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: '#eef2f7',
  },
  cardHead: { flexDirection: 'row', alignItems: 'center' },
  dot: { width: 10, height: 10, borderRadius: 10, marginRight: 8 },
  title: { fontSize: fontSize.lg, fontWeight: '700', color: '#0f172a', flex: 1 },
  meta: { marginTop: 4, color: colors.primary, fontSize: 12, fontWeight: '600' },
  brief: { marginTop: 8, color: '#475569', fontSize: 14, lineHeight: 21 },
  footerRow: { marginTop: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  groupTag: {
    color: '#334155',
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    fontSize: 12,
  },
  link: { color: '#2563eb', fontWeight: '600', fontSize: 13 },
});
