const __ = {
  newLine: "\n",
  emptyStr: "",
  space: " ",
  tzUTC: "UTC",
  addressSeperator: "\n--\n",
  settings: {
    appname: "boring-devtools",
    version: "1.0.6",
    fontFamily: "'JetBrains Mono', monospace",
    myURL: "https://suru.im",
    license: "MIT",
    licenseURL: "https://github.com/suru33/boring-devtools/blob/master/LICENSE",
    copyright: "Copyright © 2023 - 2024 Surendra"
  },
  charsets: {
    uppercase: [ "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z" ],
    lowercase: [ "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z" ],
    numeric: [ "0", "1", "2", "3", "4", "5", "6", "7", "8", "9" ],
    symbol: [ "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "[", "]", "=" ]
  },
  help: {
    selectTool: "Select a tool from the sidebar"
  },
  errmsg: {
    dateRange: "* start date and time should be < end date time",
    timezoneGet: "Failed to get your timezone",
    lessThanMax: "should be < max",
    pageNotFound: "Page not found"
  },
  sk: {
    theme: "app-color-scheme",
    startDate: "sd",
    endDate: "ed",
    startTime: "st",
    endTime: "et",
    howMany: "how-many",
    length: "length",
    min: "min",
    max: "max",
    count: "count",
    selectedCountries: "selected-countries",
    locale: "locale"
  },
  labels: {
    output: "Output",
    input: "Input",
    inputEmpty: "Input is empty",
    strip: "Strip",
    length: "Length",
    text: "Text",
    base64: "Base64",
    generate: "Generate",
    selectCountries: "Select countries",
    selectLocale: "Select locale",
    date: "Date",
    time: "Time",
    format: "Format",
    startDate: "Start date",
    startDateTime: "Start date & time",
    endDate: "End date",
    endDateTime: "End date & time",
    outputTimezone: "Output timezone",
    timezone: "Timezone",
    yourTimezone: "Your timezone: ",
    utcOffset: "UTC Offset",
    search: "Search...",
    nothingFound: "Nothing found...",
    differenceIs: "The difference is:",
    howManyQ: "How many?",
    howManyTimesQ: "How many times?",
    ipVersion: "IP Version",
    ipv4: "IPv4",
    ipv6: "IPv6",
    min: "Min",
    max: "Max",
    precision: "Precision",
    floatValues: "Float values",
    charset: "Character Set",
    addMoreChars: "add more characters",
    stringCase: "String case",
    uniqueChars: "Unique Characters",
    palindrome: "Palindrome string",
    notPalindrome: "Not a palindrome string",
    now: "Now",
    allCountriesSelected: "All countries are selected by default",
    words: "Words",
    sentences: "Sentences",
    paragraphs: "Paragraphs",
    slug: "Slug",
    textType: "Text type",
    credits: "Credits",
    license: "License",
    toggleColorScheme: "Toggle color scheme",
    copied: "Copied",
    copy: "Copy",
    wordsCount: "World count",
    timestampSuffixes: [ "Year", "Month", "Day", "Hour", "Minute", "Second" ],
    charsets: {
      uppercase: "Uppercase alphabets",
      lowercase: "Lowercase alphabets",
      digits: "Digits",
      symbols: "Symbols (!@#$%^&*()[]=)",
      extras: "Extra characters"
    },
    shortcuts: {
      mac: [ "⌘ + K", "⌘ + J" ],
      others: [ "Ctrl + K", "Ctrl + J" ]
    }
  },
  formats: {
    splitTimestamp: [ "Y;M;D;H;m;s", ";" ],
    splitTimestampWithTimeZone: [ "YYYY;MM;DD;HH;mm;ss;Z", ";" ],
    dateTime: "YYYY-MM-DD HH:mm:ss",
    dateTimeConv: "YYYY-MM-DDTHH:mm:ss",
    dateTimeWithOutSeconds: "YYYY-MM-DD HH:mm"
  },
  shortcuts: {
    search: "mod + K",
    toggleTheme: "mod + J"
  }
};

export default __;
