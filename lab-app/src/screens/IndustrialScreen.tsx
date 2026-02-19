import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { spacing } from '../theme';
import { industrialBases } from '../data/industrialization';

export default function IndustrialScreen({ navigation }: any) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.topCard}>
        <Text style={styles.pageTitle}>产业化基地</Text>
        <Text style={styles.pageSub}>聚焦示范应用与设备工程化，点击查看基地详情</Text>
      </View>

      {industrialBases.map((base) => (
        <TouchableOpacity
          key={base.slug}
          style={styles.card}
          activeOpacity={0.86}
          onPress={() => navigation.navigate('IndustrialDetail', { slug: base.slug })}
        >
          <Text style={styles.title}>{base.titleZh}</Text>
          {!!base.titleEn && <Text style={styles.sub}>{base.titleEn}</Text>}
          <Text style={styles.brief} numberOfLines={2}>{base.briefZh}</Text>
          <View style={styles.row}>
            <Text style={styles.badge}>{base.monitorUrl ? '含监测系统' : '示范基地'}</Text>
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
  title: { fontSize: 18, fontWeight: '700', color: '#0f172a' },
  sub: { fontSize: 12, color: '#64748b', marginTop: 2 },
  brief: { marginTop: 8, color: '#475569', fontSize: 14, lineHeight: 21 },
  row: { marginTop: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  badge: {
    color: '#334155',
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    fontSize: 12,
  },
  link: { color: '#2563eb', fontWeight: '600', fontSize: 13 },
});
