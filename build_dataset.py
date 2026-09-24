#!/usr/bin/env python3
"""
Build the offline Ge'ez dataset.

Sources:
1) Beta Maṣāḥəft / University of Hamburg: Online Lexicon Linguae Aethiopicae
   CC BY 4.0 package: gez-en-2.6.xar
2) AGE (Amharic–Ge'ez–English) parallel dataset by Henok Biadglign Ademtew
   and Mikiyas Girma Birbo, CC BY-SA 4.0 according to its project page.

The script deliberately does NOT copy modern copyrighted dictionaries.
"""
import csv, io, json, os, re, shutil, tempfile, urllib.request, zipfile
from pathlib import Path
import xml.etree.ElementTree as ET

ROOT=Path(__file__).resolve().parents[1]
WWW=ROOT/"www"; WWW.mkdir(exist_ok=True)

XAR_URL="https://www.fdr.uni-hamburg.de/record/702/files/gez-en-2.6.xar?download=1"
AGE_URL="https://huggingface.co/datasets/Henok/age_dataset/resolve/main/AGE.csv?download=true"

def download(url, dest):
    req=urllib.request.Request(url, headers={"User-Agent":"GeezOfflineBuilder/1.0"})
    with urllib.request.urlopen(req, timeout=120) as r, open(dest,"wb") as f:
        shutil.copyfileobj(r,f)

def text(el):
    return " ".join("".join(el.itertext()).split()) if el is not None else ""

def local(tag):
    return tag.rsplit("}",1)[-1].lower()

def parse_xar(path):
    words=[]
    with zipfile.ZipFile(path) as z:
        names=[n for n in z.namelist() if n.lower().endswith((".xml",".tei",".xhtml"))]
        for name in names:
            try: raw=z.read(name)
            except: continue
            if len(raw)>30_000_000: continue
            try: root=ET.fromstring(raw)
            except: continue
            for entry in root.iter():
                if local(entry.tag)!="entry": continue
                forms=[]; senses=[]
                for el in entry.iter():
                    t=local(el.tag)
                    if t in ("form","orth","lemma","headword"):
                        v=text(el)
                        if v and len(v)<300: forms.append(v)
                    if t in ("sense","def","definition","gloss"):
                        v=text(el)
                        if v and len(v)<1200: senses.append(v)
                forms=list(dict.fromkeys(forms)); senses=list(dict.fromkeys(senses))
                if forms:
                    words.append({"geez":forms[0],"amharic":"","english":"; ".join(senses[:6]),
                                  "pos":"","source":"Dillmann/Beta Maṣāḥəft CC BY 4.0"})
    uniq={x["geez"]:x for x in words if x["geez"]}
    return list(uniq.values())

def parse_age(path):
    phrases=[]
    with open(path,"r",encoding="utf-8-sig",newline="") as f:
        for row in csv.DictReader(f):
            g=(row.get("gez") or "").strip(); a=(row.get("amh") or "").strip(); e=(row.get("eng") or "").strip()
            if g and (a or e):
                phrases.append({"geez":g,"amharic":a,"english":e,"source":"AGE dataset CC BY-SA 4.0"})
    return phrases

def tokenize_geez(s):
    s=re.sub(r"[።፣፤፥፦፧፨,.;:!?()\\[\\]{}\"'“”‘’]"," ",s)
    return [x for x in s.split() if len(x)>=2]

def build():
    tmp=Path(tempfile.mkdtemp(prefix="geez-build-"))
    try:
        xar=tmp/"dillmann.xar"; age=tmp/"AGE.csv"
        print("Downloading Dillmann package...")
        download(XAR_URL,xar)
        print("Downloading AGE dataset...")
        download(AGE_URL,age)
        words=parse_xar(xar)
        phrases=parse_age(age)

        # Add contextual lexical records from the parallel corpus.
        # These are explicitly labeled "context-derived", not dictionary definitions.
        seen={w["geez"] for w in words}
        freq={}
        for p in phrases:
            for tok in tokenize_geez(p["geez"]):
                freq.setdefault(tok,[]).append(p)
        for tok, ps in freq.items():
            if tok in seen: continue
            if len(ps)>=2:
                best=max(ps,key=lambda x:len(x["geez"]))
                words.append({"geez":tok,"amharic":"","english":"",
                              "pos":"","source":"AGE context-derived"})
        words.sort(key=lambda x:x["geez"])
        verbs=[w for w in words if w.get("pos","").lower() in ("verb","ግስ","v")]
        # Keep full phrase set; it is the main tri-lingual content.
        payload={"meta":{"appName":"የግዕዝ መዝገበ ቃላት",
                          "author":"ዲ/ን ቃለአብ ተሾመ",
                          "mode":"offline",
                          "wordCount":len(words),"phraseCount":len(phrases),
                          "verbCount":len(verbs)},
                 "words":words,"verbs":verbs,"phrases":phrases}
        with open(WWW/"data.json","w",encoding="utf-8") as f:
            json.dump(payload,f,ensure_ascii=False,separators=(",",":"))
        print("Built:",len(words),"word/context records;",len(verbs),"verbs;",len(phrases),"tri-lingual phrases.")
        if len(words)+len(phrases)<10000:
            raise SystemExit("Dataset build produced fewer than 10,000 records; review source extraction before release.")
    finally:
        shutil.rmtree(tmp,ignore_errors=True)

if __name__=="__main__": build()
