module.exports = function SiteInvitationController(SiteInvitationService, SiteUserService) {
    return {
        getAll: async (req, res, next) => {
            const {page, itemsPerPage, order, ...filters} = req.query;
            try {
                const results = await SiteInvitationService.findAll(filters, {
                    order,
                    limit: itemsPerPage,
                    offset: (page - 1) * itemsPerPage,
                });

                res.json(results);
            } catch (err) {
                next(err);
            }
        },
        getOne: async (req, res, next) => {
            const {id} = req.params;
            try {
                const result = await SiteInvitationService.findOne({id: parseInt(id, 10)});
                if (result) res.json(result);
                else res.sendStatus(404);
            } catch (err) {
                next(err);
            }
        },
        create: async (req, res, next) => {
            const {body} = req;
            try {
                const result = await SiteInvitationService.create(body);
                res.status(201).json(result);
            } catch (err) {
                next(err);
            }
        },
        accept: async (req, res, next) => {
            const {id} = req.params;
            try {
                const invitation = await SiteInvitationService.findOne({id: parseInt(id, 10)});
                if (!invitation) return res.sendStatus(404);
                if (invitation.accepted) return res.status(409).json({error: 'Invitation already accepted'});
                const [result] = await SiteInvitationService.update({id: parseInt(id, 10)}, {accepted: true, ...invitation});
                if (result) {
                    const siteUserResult = await SiteUserService.create({
                        siteId: invitation.siteId,
                        userId: invitation.userId,
                        role: invitation.role,
                    });
                    res.status(201).json(siteUserResult);
                } else {
                    res.sendStatus(404);
                }
            } catch (err) {
                next(err);
            }
        },
        refuse: async (req, res, next) => {
            const {id} = req.params;
            try {
                const invitation = await SiteInvitationService.findOne({id: parseInt(id, 10)});
                if (!invitation) return res.sendStatus(404);
                if (invitation.accepted) return res.sendStatus(409);
                const [result] = await SiteInvitationService.update({id: parseInt(id, 10)}, {
                    accepted: false,
                    invitation
                });
                if (result) res.json(result);
                else res.sendStatus(404);
            } catch (err) {
                next(err);
            }
        },
        delete: async (req, res, next) => {
            const {id} = req.params;
            try {
                const nbDeleted = await SiteInvitationService.delete({id: parseInt(id, 10)});
                if (nbDeleted) res.sendStatus(204);
                else res.sendStatus(404);
            } catch (err) {
                next(err);
            }
        },
    };
};
