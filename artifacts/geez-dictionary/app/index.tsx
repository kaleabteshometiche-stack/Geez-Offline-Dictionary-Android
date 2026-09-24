import { Feather } from '@expo/vector-icons';
import React, { useMemo, useState } from 'react';
import {
  FlatList,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  datasetMeta,
  DictionaryEntry,
  dictionaryEntries,
  EntryKind,
} from '@/data/dictionary';
import { useColors } from '@/hooks/useColors';

type Filter = 'all' | EntryKind;

const filterLabels: Record<Filter, string> = {
  all: 'ሁሉም',
  word: 'ቃላት',
  verb: 'ግሶች',
  phrase: 'ሐረጎች',
};

const kindLabels: Record<EntryKind, string> = {
  word: 'ቃል',
  verb: 'ግስ',
  phrase: 'ሐረግ',
};

const normalize = (value: string) => value.toLocaleLowerCase().trim();

function EntryCard({
  entry,
  colors,
}: {
  entry: DictionaryEntry;
  colors: ReturnType<typeof useColors>;
}) {
  return (
    <View style={[styles.entryCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <View style={styles.entryTopline}>
        <View style={[styles.kindPill, { backgroundColor: colors.accent }]}>
          <Text style={[styles.kindText, { color: colors.accentForeground }]}>
            {entry.pos ?? kindLabels[entry.kind]}
          </Text>
        </View>
        <Feather name="arrow-up-right" size={16} color={colors.mutedForeground} />
      </View>
      <Text style={[styles.geez, { color: colors.foreground }]}>{entry.geez}</Text>
      <Text style={[styles.amharic, { color: colors.primary }]}>{entry.amharic}</Text>
      <Text style={[styles.english, { color: colors.mutedForeground }]}>{entry.english}</Text>
    </View>
  );
}

export default function DictionaryScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState<string>('');
  const [filter, setFilter] = useState<Filter>('all');

  const normalizedQuery = normalize(query);
  const results = useMemo(() => {
    return dictionaryEntries.filter((entry) => {
      const matchesFilter = filter === 'all' || entry.kind === filter;
      const matchesQuery =
        !normalizedQuery ||
        [entry.geez, entry.amharic, entry.english].some((value) =>
          normalize(value).includes(normalizedQuery),
        );
      return matchesFilter && matchesQuery;
    });
  }, [filter, normalizedQuery]);

  const clearSearch = () => {
    setQuery('');
    Keyboard.dismiss();
  };

  return (
    <View
      style={[
        styles.screen,
        {
          backgroundColor: colors.background,
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        },
      ]}
    >
      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <EntryCard entry={item} colors={colors} />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        ListHeaderComponent={
          <View>
            <View style={styles.header}>
              <View style={styles.brandRow}>
                <View style={[styles.brandMark, { backgroundColor: colors.primary }]}>
                  <Feather name="book-open" size={21} color={colors.primaryForeground} />
                </View>
                <View>
                  <Text style={[styles.eyebrow, { color: colors.primary }]}>OFFLINE DICTIONARY</Text>
                  <Text style={[styles.title, { color: colors.foreground }]}>የግዕዝ መዝገበ ቃላት</Text>
                </View>
              </View>
              <View style={styles.headerCopy}>
                <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>
                  ግዕዝ · አማርኛ · English
                </Text>
                <View style={styles.statusRow}>
                  <View style={[styles.statusDot, { backgroundColor: colors.primary }]} />
                  <Text style={[styles.statusText, { color: colors.mutedForeground }]}>
                    በስልክዎ ውስጥ ይገኛል
                  </Text>
                </View>
              </View>
            </View>

            <View
              style={[
                styles.searchShell,
                { backgroundColor: colors.card, borderColor: query ? colors.primary : colors.input },
              ]}
            >
              <Feather name="search" size={20} color={colors.primary} />
              <TextInput
                value={query}
                onChangeText={setQuery}
                placeholder="ቃል ፈልግ…"
                placeholderTextColor={colors.mutedForeground}
                style={[styles.searchInput, { color: colors.foreground }]}
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="search"
                testID="dictionary-search"
              />
              {query.length > 0 ? (
                <Pressable
                  onPress={clearSearch}
                  accessibilityRole="button"
                  accessibilityLabel="ፍለጋን አጽዳ"
                  style={({ pressed }) => [styles.iconButton, pressed && styles.pressed]}
                  testID="clear-search"
                >
                  <Feather name="x" size={18} color={colors.mutedForeground} />
                </Pressable>
              ) : (
                <View style={[styles.searchHint, { backgroundColor: colors.muted }]}>
                  <Text style={[styles.searchHintText, { color: colors.mutedForeground }]}>Aa</Text>
                </View>
              )}
            </View>

            <FlatList
              data={Object.keys(filterLabels) as Filter[]}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item}
              contentContainerStyle={styles.filters}
              renderItem={({ item }) => {
                const active = filter === item;
                return (
                  <Pressable
                    onPress={() => setFilter(item)}
                    accessibilityRole="button"
                    accessibilityState={{ selected: active }}
                    style={({ pressed }) => [
                      styles.filterChip,
                      {
                        backgroundColor: active ? colors.primary : colors.card,
                        borderColor: active ? colors.primary : colors.border,
                      },
                      pressed && styles.pressed,
                    ]}
                    testID={`filter-${item}`}
                  >
                    <Text
                      style={[
                        styles.filterText,
                        { color: active ? colors.primaryForeground : colors.mutedForeground },
                      ]}
                    >
                      {filterLabels[item]}
                    </Text>
                  </Pressable>
                );
              }}
            />

            <View style={styles.resultsHeader}>
              <View>
                <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
                  {normalizedQuery ? 'የፍለጋ ውጤቶች' : 'በቅርቡ ይፈልጉ'}
                </Text>
                <Text style={[styles.sectionCaption, { color: colors.mutedForeground }]}>
                  {filter === 'all' ? 'ሁሉንም ምድቦች እያሳየ ነው' : `${filterLabels[filter]} ብቻ`}
                </Text>
              </View>
              <View style={[styles.countBadge, { backgroundColor: colors.secondary }]}>
                <Text style={[styles.countText, { color: colors.secondaryForeground }]}>
                  {results.length}
                </Text>
              </View>
            </View>
          </View>
        }
        ListEmptyComponent={
          <View style={[styles.emptyState, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={[styles.emptyIcon, { backgroundColor: colors.muted }]}>
              <Feather name="search" size={22} color={colors.mutedForeground} />
            </View>
            <Text style={[styles.emptyTitle, { color: colors.foreground }]}>ምንም አልተገኘም</Text>
            <Text style={[styles.emptyCopy, { color: colors.mutedForeground }]}>
              ሌላ የግዕዝ፣ አማርኛ ወይም English ቃል ይሞክሩ።
            </Text>
          </View>
        }
        ListFooterComponent={
          <View style={styles.footer}>
            <View style={[styles.footerLine, { backgroundColor: colors.border }]} />
            <Text style={[styles.footerTitle, { color: colors.foreground }]}>ዲ/ን ቃለአብ ተሾመ</Text>
            <Text style={[styles.footerCopy, { color: colors.mutedForeground }]}>
              {datasetMeta.note}
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 34,
  },
  header: {
    paddingTop: 22,
    paddingBottom: 22,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  brandMark: {
    width: 46,
    height: 46,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  eyebrow: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.5,
    marginBottom: 3,
  },
  title: {
    fontSize: 23,
    fontWeight: '700',
    lineHeight: 29,
  },
  headerCopy: {
    paddingLeft: 58,
    marginTop: 8,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '500',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 5,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusText: {
    fontSize: 12,
  },
  searchShell: {
    height: 58,
    borderWidth: 1,
    borderRadius: 18,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 11,
    shadowColor: '#101828',
    shadowOpacity: 0.06,
    shadowRadius: 13,
    shadowOffset: { width: 0, height: 5 },
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 17,
    paddingVertical: 0,
  },
  iconButton: {
    padding: 5,
  },
  searchHint: {
    width: 30,
    height: 30,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchHintText: {
    fontSize: 12,
    fontWeight: '700',
  },
  filters: {
    gap: 8,
    paddingVertical: 18,
  },
  filterChip: {
    minHeight: 39,
    borderRadius: 13,
    borderWidth: 1,
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterText: {
    fontSize: 13,
    fontWeight: '600',
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  sectionCaption: {
    fontSize: 12,
    marginTop: 3,
  },
  countBadge: {
    minWidth: 34,
    height: 28,
    paddingHorizontal: 8,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  countText: {
    fontSize: 13,
    fontWeight: '700',
  },
  entryCard: {
    borderWidth: 1,
    borderRadius: 18,
    padding: 16,
    marginBottom: 10,
  },
  entryTopline: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  kindPill: {
    borderRadius: 8,
    paddingHorizontal: 9,
    paddingVertical: 5,
  },
  kindText: {
    fontSize: 11,
    fontWeight: '700',
  },
  geez: {
    fontSize: 27,
    fontWeight: '700',
    lineHeight: 34,
  },
  amharic: {
    fontSize: 17,
    fontWeight: '600',
    marginTop: 5,
  },
  english: {
    fontSize: 14,
    lineHeight: 20,
    marginTop: 5,
  },
  emptyState: {
    borderWidth: 1,
    borderRadius: 18,
    padding: 28,
    alignItems: 'center',
    marginTop: 4,
  },
  emptyIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 17,
    fontWeight: '700',
  },
  emptyCopy: {
    fontSize: 13,
    lineHeight: 20,
    textAlign: 'center',
    marginTop: 6,
  },
  footer: {
    alignItems: 'center',
    paddingTop: 18,
  },
  footerLine: {
    width: '100%',
    height: 1,
    marginBottom: 16,
  },
  footerTitle: {
    fontSize: 13,
    fontWeight: '700',
  },
  footerCopy: {
    fontSize: 11,
    lineHeight: 17,
    textAlign: 'center',
    marginTop: 4,
    maxWidth: 300,
  },
  pressed: {
    opacity: 0.72,
  },
});