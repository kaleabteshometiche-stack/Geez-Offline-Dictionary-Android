# የግዕዝ መዝገበ ቃላት

ይህ ከInternet ውጭ የሚሰራ የግዕዝ–አማርኛ–English መዝገበ ቃላት Android app ነው።

## ያለው ነገር

- ግዕዝ፣ አማርኛ ወይም English በመጻፍ ፈጣን offline ፍለጋ
- ቃላት፣ ግሶች እና ሐረጎች በምድብ ማጣራት
- 35,000+ የሚሆኑ ቃላትና ሐረጎች በapp ውስጥ
- የተያያዙ ክፍት ምንጮችንና ፈቃዶችን የሚጠብቅ dataset builder

## የAndroid APK ግንባታ

GitHub repository ላይ push ካደረጉ በኋላ:

1. Actions → **Build Android APK** ይክፈቱ።
2. Workflow-ውን ያስኪዱ።
3. `geez-offline-debug-apk` artifact ያውርዱ።

Workflow-ው በrepository ውስጥ ያለውን ሙሉ offline dataset ያረጋግጣል፣ Android project ይፈጥራል እና debug APK ይገነባል። ይህ debug APK ከPlay Store ውጭ በቀጥታ ሊጫን ይችላል።

በlocal ለመሞከር:

```bash
pnpm install
pnpm --filter @workspace/geez-dictionary run dev
```

የሙሉ dataset ፋይልን እንደገና ለመገንባት:

```bash
pnpm --filter @workspace/geez-dictionary run build:dataset
```

የዳታ ማስፋፊያውን ካስኬዱ በኋላ `data/dictionary.json` እንደተለወጠ አስቀምጠው ከዚያ workflow-ውን ያስኪዱ።

## ምንጮችና ፈቃድ

- Online Lexicon Linguae Aethiopicae / Dillmann digital package — CC BY 4.0
- AGE Amharic–Ge'ez–English parallel dataset — CC BY-SA 4.0

የapp አዘጋጅ: **ዲ/ን ቃለአብ ተሾመ**