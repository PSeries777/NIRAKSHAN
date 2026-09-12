import { Job, Worker, LanguageCode } from '../types';

interface QueryContext {
  activeJob: Job | null;
  currentWorker: Worker | null;
  language: LanguageCode;
}

export function answerWorkerQuery(question: string, context: QueryContext): string {
  const q = question.toLowerCase().trim();
  const { activeJob, currentWorker, language } = context;

  // 1. Duration / Days queries
  if (
    q.includes('दिन') ||
    q.includes('कालावधी') ||
    q.includes('दिवस') ||
    q.includes('days') ||
    q.includes('duration') ||
    q.includes('how long')
  ) {
    if (!activeJob) {
      return language === 'hi'
        ? 'वर्तमान में कोई सक्रिय कार्य चयनित नहीं है। कृपया ठेकेदार से संपर्क करें।'
        : language === 'mr'
        ? 'सध्या कोणतेही सक्रिय काम निवडलेले नाही. कृपया कंत्राटदाराशी संपर्क साधा.'
        : 'There is no active project selected right now. Please contact your recruiter.';
    }

    if (language === 'hi') {
      return `यह कार्य ${activeJob.durationDays} दिनों का है। यह ${activeJob.startDate} को सुबह ${activeJob.reportingTime} बजे से शुरू होगा।`;
    } else if (language === 'mr') {
      return `हे काम ${activeJob.durationDays} दिवसांचे आहे. हे ${activeJob.startDate} रोजी सकाळी ${activeJob.reportingTime} वाजता सुरू होईल.`;
    } else {
      return `This project runs for ${activeJob.durationDays} days, starting ${activeJob.startDate} at ${activeJob.reportingTime}.`;
    }
  }

  // 2. Payment / Wage / Money queries
  if (
    q.includes('पैसे') ||
    q.includes('रुपये') ||
    q.includes('मानधन') ||
    q.includes('भुगतान') ||
    q.includes('pay') ||
    q.includes('money') ||
    q.includes('salary') ||
    q.includes('rate') ||
    q.includes('₹')
  ) {
    if (!activeJob) {
      return language === 'hi'
        ? 'भुगतान की जानकारी के लिए कृपया अपने ठेकेदार से संपर्क करें।'
        : language === 'mr'
        ? 'मानधनाच्या तपशीलासाठी कृपया तुमच्या कंत्राटदाराशी संपर्क साधा.'
        : 'Please contact your recruiter for payment verification.';
    }

    const totalEst = activeJob.dailyPayment * activeJob.durationDays;
    if (language === 'hi') {
      return `इस काम के लिए ₹${activeJob.dailyPayment} प्रति दिन का भुगतान तय है। ${activeJob.durationDays} दिनों का कुल अनुमानित भुगतान ₹${totalEst} होगा। ${activeJob.paymentNotes}`;
    } else if (language === 'mr') {
      return `या कामासाठी प्रतिदिन ₹${activeJob.dailyPayment} मानधन निश्चित आहे. ${activeJob.durationDays} दिवसांचे एकूण ₹${totalEst} मानधन मिळेल. ${activeJob.paymentNotes}`;
    } else {
      return `The daily compensation is ₹${activeJob.dailyPayment}/day. Total for ${activeJob.durationDays} days is approximately ₹${totalEst}. Notes: ${activeJob.paymentNotes}`;
    }
  }

  // 3. Location / Address queries
  if (
    q.includes('स्थान') ||
    q.includes('कहाँ') ||
    q.includes('पत्ता') ||
    q.includes('कुठे') ||
    q.includes('location') ||
    q.includes('where') ||
    q.includes('address')
  ) {
    if (!activeJob) {
      return language === 'hi'
        ? 'स्थान की जानकारी उपलब्ध नहीं है। कृपया ठेकेदार से पूछें।'
        : language === 'mr'
        ? 'कामाच्या ठिकाणाची माहिती उपलब्ध नाही. कृपया कंत्राटदाराला विचारा.'
        : 'Location details are currently unavailable. Please ask your recruiter.';
    }

    if (language === 'hi') {
      return `कार्य स्थल ${activeJob.location} है। रिपोर्टिंग का समय सुबह ${activeJob.reportingTime} है।`;
    } else if (language === 'mr') {
      return `कामाचे ठिकाण ${activeJob.location} येथे आहे. हजर राहण्याची वेळ सकाळी ${activeJob.reportingTime} आहे.`;
    } else {
      return `The project location is ${activeJob.location}. Reporting time is ${activeJob.reportingTime}.`;
    }
  }

  // 4. Availability / Coming Tomorrow queries
  if (
    q.includes('कल') ||
    q.includes('उद्या') ||
    q.includes('आ सकता') ||
    q.includes('available') ||
    q.includes('tomorrow') ||
    q.includes('उपलब्ध')
  ) {
    const isAvail = currentWorker?.availability === 'available';
    if (language === 'hi') {
      return isAvail
        ? `आपकी प्रोफ़ाइल में आप अभी 'उपलब्ध' हैं। क्या आप ${activeJob?.title || 'इस कार्य'} के लिए अपनी रुचि दर्ज करना चाहते हैं?`
        : 'आपकी प्रोफ़ाइल वर्तमान में व्यस्त स्थिति में है। यदि आप उपलब्ध हैं, तो प्रोफ़ाइल अपडेट करें।';
    } else if (language === 'mr') {
      return isAvail
        ? `तुमच्या प्रोफाईलनुसार तुम्ही सध्या 'उपलब्ध' आहात. तुम्ही ${activeJob?.title || 'या कामासाठी'} रुची नोंदवू इच्छिता का?`
        : 'तुमची स्थिती सध्या व्यस्त दर्शवत आहे. उपलब्ध असल्यास कृपया स्थिती बदला.';
    } else {
      return isAvail
        ? `Your status is marked as 'Available'. Would you like to confirm interest in ${activeJob?.title || 'this project'}?`
        : 'Your profile is currently marked as busy on another assignment.';
    }
  }

  // 5. Work history / Completed jobs
  if (
    q.includes('इतिहास') ||
    q.includes('काम किए') ||
    q.includes('कामे केली') ||
    q.includes('history') ||
    q.includes('jobs completed')
  ) {
    const jobsCount = currentWorker?.jobsCompleted || 0;
    const rating = currentWorker?.rating || 4.7;
    if (language === 'hi') {
      return `आपके डिजिटल खाते में ${jobsCount} कार्य पूर्ण और सत्यापित हैं, और आपकी रेटिंग ★ ${rating} है।`;
    } else if (language === 'mr') {
      return `तुमच्या डिजिटल खात्यात ${jobsCount} कामे पूर्ण आणि प्रमाणित आहेत, आणि तुमचे रेटिंग ★ ${rating} आहे.`;
    } else {
      return `Your digital identity records ${jobsCount} verified completed jobs with a rating of ★ ${rating}.`;
    }
  }

  // Fallback (Safe, zero-hallucination)
  if (language === 'hi') {
    return 'मुझे इस बारे में निश्चित जानकारी नहीं है। गलत जानकारी देने से बचने के लिए, कृपया सीधे अपने ठेकेदार से बात करें।';
  } else if (language === 'mr') {
    return 'माझ्याकडे याबद्दल पुरेशी माहिती नाही. चुकीची माहिती टाळण्यासाठी, कृपया थेट कंत्राटदाराशी संपर्क साधा.';
  } else {
    return "I don't have that verified information in the project record. To avoid any inaccuracies, please contact your recruiter directly.";
  }
}
