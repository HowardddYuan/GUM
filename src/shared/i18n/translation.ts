export type Locale = 'en' | 'zh'

export const translations = {
    en: {
      premiumConsultation: {
        titleLine1: 'Got more questions?',
        titleLine2: 'GUM Specialists are here!',
        subtitle:
          'We provide professional, impartial advice to help you find what’s best for you',

        specialists: {
          title: 'Our Specialists',
          loading: 'Loading specialists...',
          error: 'Oops! Something went wrong. Please close the app and try again.',
          retry: 'Retry',
        },

        serviceHours: {
          title: 'Service Hours:',
          weekday: 'Monday – Friday: 9:30am - 5:30pm',
          holiday: 'Saturday, Sunday & Public Holidays: Closed',
        },

        actions: {
          bookAppointment: 'Book appointment',
          whatsappUs: 'WhatsApp us',
          openExternally: 'Open in browser',
        },

        contact: {
          description:
            'For general enquiries, please feel free to reach out to us using the method below:',
          hotlineLabel: 'Hotline:',
          hotline: '+852 2893 4402',
          emailLabel: 'Email address:',
          email: 'memberservice@gumhk.com',
        },

        agreement:
          'Your use of our appointment service or communication via WhatsApp constitutes your agreement to our collection and use of personal data as outlined in our privacy policy.',

        whatsapp: {
          message:
            'Hello, I would like to learn more about MPF information.',
        },
      },
    },

    zh: {
      premiumConsultation: {
        titleLine1: '有更多問題嗎？',
        titleLine2: 'GUM 專家為你服務！',
        subtitle:
          '我們提供專業同中立嘅意見，幫你作出最合適嘅選擇。',

        specialists: {
          title: '專家團隊',
          loading: '正在載入專家資料...',
          error: 'Oops! Something went wrong. Please close the app and try again.',
          retry: 'Retry',
        },

        serviceHours: {
          title: '服務時間：',
          weekday: '星期一至五：上午9:30 - 下午5:30',
          holiday: '星期六、日及公眾假期：休息',
        },

        actions: {
          bookAppointment: '立即預約諮詢',
          whatsappUs: 'WhatsApp',
          openExternally: '於瀏覽器開啟',
        },

        contact: {
          description:
            '如有一般查詢，歡迎致電本公司熱線 +852 28934402 或電郵至 memberservice@gumhk.com 與我們聯絡。',
          hotlineLabel: '熱線：',
          hotline: '+852 2893 4402',
          emailLabel: '電郵：',
          email: 'memberservice@gumhk.com',
        },

        agreement:
          '閣下使用本公司之預約服務或透過 WhatsApp 與本公司聯絡，即表示同意本公司根據私隱政策所載條款，收集及使用閣下之個人資料。',

        whatsapp: {
          message:
            '你好，我想了解更多有關強積金嘅資訊',
        },
      },
    },
  } as const;