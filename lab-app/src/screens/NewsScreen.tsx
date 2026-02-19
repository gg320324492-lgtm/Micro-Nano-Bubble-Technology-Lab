import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { colors, spacing, fontSize } from '../theme';
import { news } from '../data/news';

interface NewsScreenProps {
  navigation: any;
}

export default function NewsScreen({ navigation }: NewsScreenProps) {
  const handleOpenLink = (href: string) => {
    if (href) {
      Linking.openURL(href).catch(err => console.error('Failed to open URL:', err));
    }
  };
  
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>新闻动态</Text>
        <Text style={styles.headerSubtitle}>
          实验室最新资讯
        </Text>
      </View>
      
      <View style={styles.timeline}>
        {news.map((item, index) => (
          <TouchableOpacity 
            key={item.id} 
            style={styles.newsCard}
            onPress={() => handleOpenLink(item.href || '')}
            disabled={!item.href}
            activeOpacity={0.8}
          >
            <View style={styles.timelineLeft}>
              <View style={styles.timelineDot}>
                <View style={styles.dot} />
              </View>
              {index < news.length - 1 && <View style={styles.timelineLine} />}
            </View>
            
            <View style={styles.newsContent}>
              <View style={styles.dateContainer}>
                <Text style={styles.dateYear}>{item.date.split('-')[0]}</Text>
                <Text style={styles.dateSeparator}>年</Text>
                <Text style={styles.dateMonth}>{item.date.split('-')[1]}</Text>
                <Text style={styles.dateSeparator}>月</Text>
              </View>
              
              <View style={styles.newsCardInner}>
                <Text style={styles.newsTitle}>{item.titleZh}</Text>
                {item.titleEn && (
                  <Text style={styles.newsTitleEn}>{item.titleEn}</Text>
                )}
                
                {item.href ? (
                  <View style={styles.linkButton}>
                    <Text style={styles.linkButtonText}>查看详情 →</Text>
                  </View>
                ) : (
                  <View style={styles.comingSoon}>
                    <Text style={styles.comingSoonText}>即将发布</Text>
                  </View>
                )}
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>更多资讯持续更新中...</Text>
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
  timeline: {
    padding: spacing.md,
  },
  newsCard: {
    flexDirection: 'row',
    marginBottom: spacing.sm,
  },
  timelineLeft: {
    width: 30,
    alignItems: 'center',
  },
  timelineDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ffffff',
  },
  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: colors.primary,
    marginTop: 8,
    opacity: 0.3,
  },
  newsContent: {
    flex: 1,
    marginLeft: spacing.sm,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: spacing.xs,
  },
  dateYear: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.primary,
  },
  dateSeparator: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginHorizontal: 2,
  },
  dateMonth: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    color: colors.primary,
  },
  newsCardInner: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.md,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
  },
  newsTitle: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.xs,
    lineHeight: 22,
  },
  newsTitleEn: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    fontStyle: 'italic',
    marginBottom: spacing.sm,
  },
  linkButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  linkButtonText: {
    fontSize: fontSize.sm,
    color: '#ffffff',
    fontWeight: '500',
  },
  comingSoon: {
    backgroundColor: '#f5f5f5',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  comingSoonText: {
    fontSize: fontSize.sm,
    color: colors.textLight,
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
