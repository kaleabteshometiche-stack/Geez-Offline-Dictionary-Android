# የግዕዝ መዝገበ ቃላት — 10K+ Offline Android

ይህ ፕሮጀክት ለ **ዲ/ን ቃለአብ ተሾመ** የተዘጋጀ የግዕዝ መዝገበ-ቃላት አፕ መሠረት ነው።
Play Store አያስፈልግም፤ APK ከGitHub Actions artifact ማውረድ እና በFacebook ላይ ማጋራት ይቻላል።

## ምን አለ?
- ግዕዝ / አማርኛ / English ፍለጋ
- ግሶች ክፍል
- ሐረጎችና አረፍተ ነገሮች
- ሙሉ ዳታ በስልኩ ውስጥ — ከጫነ በኋላ Internet አያስፈልግም
- የአዘጋጅ ስም: ዲ/ን ቃለአብ ተሾመ

## 10,000+ ዳታ
`tools/build_dataset.py` ሁለት ክፍት ምንጮችን ይጠቀማል፦
1. Online Lexicon Linguae Aethiopicae / Dillmann digital package — CC BY 4.0.
2. AGE: Amharic–Ge'ez–English parallel dataset — CC BY-SA 4.0.

Dillmann የቃላት መዝገቦች ይገባሉ፤ AGE ደግሞ ብዙ ሺህ ሶስት-ቋንቋ ሐረጎችን ይጨምራል።
የምንጭ መረጃ ካልተረጋገጠ አዲስ የአማርኛ/English ፍቺ በራስ-ሰር አይፈጠርም።
`AGE context-derived` የሚሉ መዝገቦች የቃሉ ትክክለኛ መዝገበ-ቃላት ፍቺ አይደሉም፤ ከሐረግ አገባብ የተወሰዱ ናቸው።

## Android APK
GitHub ላይ repository አድርገህ push ካደረግክ በኋላ:
1. Actions → **Build Android APK**
2. workflow አስኪድ።
3. `geez-offline-debug-apk` artifact አውርድ።
4. APK-ውን Facebook ላይ ማጋራት ትችላለህ።

Capacitor የWeb app ን ወደ Android project ያስገባል፤ Android ክፍሉ በAndroid Studio/Gradle ይገነባል።

## አስፈላጊ የምንጭ መጥቀሻ
በአፑ ውስጥ About/Credits ላይ የምንጮቹን ስም እና license አስቀምጥ።
