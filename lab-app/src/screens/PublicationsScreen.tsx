import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { colors, spacing, fontSize } from '../theme';
import { publications } from '../data/publications';

interface PublicationsScreenProps {
  navigation: any;
}

// 按年份分组论文
const getGroupedPublications = () => {
  const groups: Record<number, typeof publications> = {};
  
  publications.forEach((pub) => {
    if (!groups[pub.year]) {
      groups[pub.year] = [];
    }
    groups[pub.year].push(pub);
  });
  
  // 按年份倒序排列
  const sortedYears = Object.keys(groups)
    .map(Number)
    .sort((a, b) => b - a);
  
  return sortedYears.map(year => ({
    year,
    pubs: groups[year],
  }));
};

export default function PublicationsScreen({ navigation }: PublicationsScreenProps) {
  const groupedPublications = getGroupedPublications();
  
  const handleOpenDOI = (url: string) => {
    if (url) {
      Linking.openURL(url).catch(err => console.error('Failed to open URL:', err));
    }
  };
  
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>发表论文</Text>
        <Text style={styles.headerSubtitle}>
          历年学术论文成果
        </Text>
        <View style={styles.headerStats}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{publications.length}</Text>
            <Text style={styles.statLabel}>篇论文</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{Object.keys(groupedPublications).length}</Text>
            <Text style={styles.statLabel}>个年份</Text>
          </View>
        </View>
      </View>
      
      {groupedPublications.map((group) => (
        <View key={group.year} style={styles.yearGroup}>
          <View style={styles.yearHeader}>
            <View style={styles.yearBadge}>
              <Text style={styles.yearTitle}>{group.year}</Text>
            </View>
            <Text style={styles.yearCount}>{group.pubs.length} 篇</Text>
          </View>
          
          {group.pubs.map((pub, index) => (
            <TouchableOpacity 
              key={pub.id} 
              style={styles.paperCard}
              onPress={() => handleOpenDOI(pub.url || '')}
              activeOpacity={0.8}
            >
              <View style={styles.paperIndex}>
                <Text style={styles.paperIndexText}>{index + 1}</Text>
              </View>
              <View style={styles.paperContent}>
                <Text style={styles.paperTitle} numberOfLines={3}>
                  {pub.title}
                </Text>
                <Text style={styles.paperVenue} numberOfLines={1}>
                  📖 {pub.venue}
                </Text>
                {pub.doi && (
                  <View style={styles.doiContainer}>
                    <Text style={styles.doiText}>🔗 DOI: {pub.doi}</Text>
                  </View>
                )}
              </View>
              <Text style={styles.paperArrow}>›</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>点击论文可查看原文链接</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: colors.primary,
    padding: spacing.xl,
    paddingTop: spacing.lg,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  headerSubtitle: {
    fontSize: fontSize.md,
    color: 'rgba(255,255,255,0.9)',
    marginTop: spacing.xs,
  },
  headerStats: {
    flexDirection: 'row',
    marginTop: spacing.md,
  },
  statBox: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: 12,
    marginHorizontal: spacing.xs,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  statLabel: {
    fontSize: fontSize.xs,
    color: 'rgba(255,255,255,0.8)',
  },
  yearGroup: {
    padding: spacing.md,
    paddingTop: spacing.sm,
  },
  yearHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  yearBadge: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 16,
  },
  yearTitle: {
    fontSize: fontSize.lg,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  yearCount: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  paperCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
  },
  paperIndex: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#e3f2fd',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  paperIndexText: {
    fontSize: fontSize.sm,
    fontWeight: 'bold',
    color: colors.primary,
  },
  paperContent: {
    flex: 1,
  },
  paperTitle: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.text,
    lineHeight: 22,
    marginBottom: spacing.xs,
  },
  paperVenue: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  doiContainer: {
    backgroundColor: '#f5f5f5',
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  doiText: {
    fontSize: 10,
    color: colors.primary,
  },
  paperArrow: {
    fontSize: 24,
    color: colors.textLight,
    marginLeft: spacing.xs,
  },
  footer: {
    padding: spacing.xl,
    alignItems: 'center',
  },
  footerText: {
    fontSize: fontSize.sm,
    color: colors.textLight,
  },
});
