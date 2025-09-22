interface Info {
    templateName:string
    info:string []
}


export const templateInfo : Info [] = [
    {
        templateName : "Investor-Webinar",
        info : [
            "Die Mails müssen im Template OHNE Spam- und Abmelde-Header gesetzt werden",
            "Es muss das Webinar-Impressum verwendet werden",
            "Der Platzhalter für den Link zum Webinar ist: {Live_Room_Link}",
            "Mail als Zip-Datei mit rel. Bildpfaden.",
            "Wenn es ein Webinar-Header gibt, muss nicht das Verlags-Logo in den Header (z.B. GeVestor-Logo)"
        ]  

    }
]
  