const SiteService = require("../services/site");
const SiteUserService = require("../services/siteUser");
const UserService = require("../services/user");
const genericController = require("./generic");
const TagService = require("../services/tag");
const ConversionTunnelService = require("../services/conversionTunnel");
const tokenGenerator = require("../utils/token-generator");
const ConversionTunnelTagService = require("../services/conversionTunnelTags");
const UntrackPathService = require("../services/untrackPath");

const service = new SiteService();
const userSiteService = new SiteUserService();
const userService = new UserService();
const controller = new genericController(service);
const tagService = new TagService();
const conversionTunnelService = new ConversionTunnelService();
const conversionTunnelTagService = new ConversionTunnelTagService();
const untrackPathService = new UntrackPathService();

controller.create = async function create(req, res, next) {
  const { body } = req;
  try {
    body.apiKey = await tokenGenerator().apiKey();
    const site = await service.create(req.body);
    await service.addUser({
      userId: parseInt(req.user.id, 10),
      siteId: parseInt(site.id),
      role: "ADMIN"
    });
    res.status(201).json(site);
  } catch (error) {
    next(error);
  }
};
controller.getMySites = async function getMySites(req, res, next) {
  const { page, order, ...filters } = req.query;
  try {
    if (page !== undefined && page < 1) {
      res.json("Page can't be lower than 1").status(400);
      return;
    }
    filters.userId = req.user.id;
    const sites = await service.findAll(filters, {
      order,
      limit: page ? 10 : undefined,
      offset: page ? (page - 1) * 10 : undefined
    });
    res.status(200).json(sites);
  } catch (error) {
    next(error);
  }
};
controller.renewApiKey = async function renewApiKey(req, res, next) {
  const { id } = req.params;
  try {
    const siteUser = await service.findOne({ id: parseInt(id, 10) });
    if (!siteUser) {
      res.sendStatus(404);
      return;
    }

    siteUser.apiKey = await tokenGenerator().apiKey();
    const [result] = await service.update({ id: parseInt(id, 10) }, siteUser.dataValues);
    if (result) res.json(result);
    else res.sendStatus(404);
  } catch (err) {
    next(err);
  }
};
controller.getUsers = async function getUsers(req, res, next) {
  const { id } = req.params;
  const { page, order, ...filters } = req.query;
  const userSiteFilters = {};
  try {
    if (page !== undefined && page < 1) {
      res.json("Page can't be lower than 1").status(400);
      return;
    }
    userSiteFilters.siteId = parseInt(id, 10);
    if (filters?.role) userSiteFilters.role = filters.role;

    const users = await userService.findAll(userSiteFilters, {
      order,
      limit: page ? 10 : undefined,
      offset: page ? (page - 1) * 10 : undefined
    });
    if (users) res.json(users);
    else res.sendStatus(404);
  } catch (err) {
    next(err);
  }
};
controller.updateUserRoleForSite = async function updateUserRoleForSite(req, res, next) {
  const { id, email } = req.params;
  const { role } = req.body;
  try {
    if (!["ADMIN", "USER"].includes(role)) {
      res.sendStatus(400);
      return;
    }
    const user = await userService.findOne({ email });
    if (!user) {
      res.sendStatus(404);
      return;
    }
    const siteUser = await userSiteService.findOne({ siteId: parseInt(id, 10), userId: parseInt(user.id, 10) });
    if (!siteUser) {
      res.sendStatus(404);
      return;
    }

    siteUser.role = role;
    const [result] = await userSiteService.update({ id: parseInt(siteUser.id, 10) }, siteUser.dataValues);
    if (result) res.json(result);
    else res.sendStatus(404);
  } catch (err) {
    next(err);
  }
};
controller.deleteUserFromSite = async function deleteUserForSite(req, res, next) {
  const { id, email } = req.params;
  try {
    const user = await userService.findOne({ email });
    if (!user) {
      res.sendStatus(404);
      return;
    }

    const siteUser = await userSiteService.findOne({ siteId: parseInt(id, 10), userId: parseInt(user.id, 10) });
    if (!siteUser) {
      res.sendStatus(404);
      return;
    }

    const result = await userSiteService.delete({ id: parseInt(siteUser.id, 10) });
    if (result) res.json(result);
    else res.sendStatus(404);
  } catch (err) {
    next(err);
  }
};

controller.getTags = async function getTags(req, res, next) {
  const { id } = req.params;
  const { page, order, ...filters } = req.query;
  try {
    if (page !== undefined && page < 1) {
      res.json("Page can't be lower than 1").status(400);
      return;
    }
    filters.siteId = parseInt(id, 10);
    const tags = await tagService.findAll(filters, {
      order,
      limit: page ? 10 : undefined,
      offset: page ? (page - 1) * 10 : undefined
    });
    if (tags) res.status(200).json(tags);
    else res.sendStatus(404);
  } catch (err) {
    next(err);
  }
};
controller.getOneTag = async function getOneTag(req, res, next) {
  const { id, tagId } = req.params;
  try {
    const tag = await tagService.findOne({ id: parseInt(tagId, 10), siteId: parseInt(id, 10) });
    if (tag) res.status(200).json(tag);
    else res.sendStatus(404);
  } catch (err) {
    next(err);
  }
};
controller.createTag = async function(req, res, next) {
  const body = req.body;
  try {
    body.createdBy = req.user.id;
    body.siteId = parseInt(req.params.id, 10);
    body.tagKey = await tokenGenerator().tagKey();
    const tag = await tagService.create(req.body);
    res.status(201).json(tag);
  } catch (err) {
    next(err);
  }
};
controller.updateTag = async function(req, res, next) {
  const { tagId } = req.params;
  const body = req.body;
  try {
    const [result] = await tagService.update({ id: parseInt(tagId, 10) }, body);
    if (result) res.json(result);
    else res.sendStatus(404);
  } catch (err) {
    next(err);
  }
};
controller.replaceTag = async function(req, res, next) {
  const { tagId } = req.params;
  const { body } = req;
  try {
    const [[result, created]] = await tagService.replace(
      { id: parseInt(tagId, 10) },
      { id: parseInt(tagId, 10), ...body }
    );
    if (created) res.status(201).json(result);
    else res.json(result);
  } catch (err) {
    next(err);
  }
};
controller.getConversionTunnels = async function getConversionTunnels(req, res, next) {
  const { page, order, ...filters } = req.query;
  try {
    if (page !== undefined && page < 1) {
      res.json("Page can't be lower than 1").status(400);
      return;
    }
    filters.siteId = parseInt(req.params.id, 10);
    const conversionTunnels = await conversionTunnelService.findAll(filters, {
      order,
      limit: page ? 10 : undefined,
      offset: page ? (page - 1) * 10 : undefined
    });
    if (conversionTunnels) res.status(200).json(conversionTunnels);
    else res.sendStatus(404);
  } catch (error) {
    next(error);
  }
};

controller.getOneConversionTunnel = async function(req, res, next) {
  const { name } = req.params;
  try {
    const conversionTunnel = await conversionTunnelService.findOne({ name: name });
    if (conversionTunnel) res.status(200).json(conversionTunnel);
    else res.sendStatus(404);
  } catch (err) {
    next(err);
  }
};

controller.createConversionTunnel = async function(req, res, next) {
  const body = req.body;
  try {
    body.createdBy = req.user.id;
    body.siteId = parseInt(req.params.id, 10);
    const conversionTunnel = await conversionTunnelService.create(req.body);
    res.status(201).json(conversionTunnel);
  } catch (err) {
    next(err);
  }
};

controller.updateConversionTunnel = async function(req, res, next) {
  const { conversionTunnelId } = req.params;
  const body = req.body;
  try {
    const [result] = await conversionTunnelService.update({ id: parseInt(conversionTunnelId, 10) }, body);
    if (result) res.json(result);
    else res.sendStatus(404);
  } catch (err) {
    next(err);
  }
};

controller.replaceConversionTunnel = async function(req, res, next) {
  const { conversionTunnelId } = req.params;
  const { body } = req;
  try {
    const [[result, created]] = await conversionTunnelService.replace(
      { id: parseInt(conversionTunnelId, 10) },
      { id: parseInt(conversionTunnelId, 10), ...body }
    );
    if (created) res.status(201).json(result);
    else res.json(result);
  } catch (err) {
    next(err);
  }
};

controller.deleteConversionTunnel = async function(req, res, next) {
  const { conversionTunnelId } = req.params;
  try {
    const conversionTunnelTags = await conversionTunnelTagService.findAll({ conversionTunnelId: parseInt(conversionTunnelId, 10) });
    const result = await conversionTunnelService.delete({ id: parseInt(conversionTunnelId, 10) });
    if (result) {
      for (const conversionTunnelTag of conversionTunnelTags) {
        await conversionTunnelTagService.delete({ id: conversionTunnelTag.id });
      }
      res.sendStatus(204);
    }
    else res.sendStatus(404);
  } catch (err) {
    next(err);
  }
};

controller.addTagToConversionTunnel = async function(req, res, next) {
  const { id, conversionTunnelId, tagId } = req.params;
  const { order } = req.body;
  try {
    const tag = await tagService.findOne({ id: parseInt(tagId, 10), siteId: parseInt(req.params.id, 10) });
    if (!tag) {
      res.status(404).json("Tag not found");
      return;
    }
    const conversionTunnel = await conversionTunnelService.findOne({ id: parseInt(conversionTunnelId, 10), siteId: parseInt(id, 10) });
    if (!conversionTunnel) {
      res.status(404).json("Conversion tunnel not found");
      return;
    }
    const conversionTunnelTag = await conversionTunnelTagService.create({
      conversionTunnelId: parseInt(conversionTunnelId, 10),
      tagId: parseInt(tagId, 10),
      order: parseInt(order, 10),
      createdBy: parseInt(req.user.id, 10)
    });
    res.status(201).json(conversionTunnelTag);
  } catch (err) {
    next(err);
  }
};
controller.removeTagFromConversionTunnel = async function(req, res, next) {
  const { conversionTunnelId, tagId } = req.params;
  try {
    const conversionTunnelTag = await conversionTunnelTagService.delete({ conversionTunnelId: parseInt(conversionTunnelId, 10), tagId: parseInt(tagId, 10) });
    if (conversionTunnelTag) res.sendStatus(204);
    else res.sendStatus(404);
  } catch (err) {
    next(err);
  }
}
controller.updateTagFromConversionTunnel = async function(req, res, next) {
  const { conversionTunnelId, tagId } = req.params;
  const { order } = req.body;
  try {
    const conversionTunnelTag = await conversionTunnelTagService.update(
      { conversionTunnelId: parseInt(conversionTunnelId, 10), tagId: parseInt(tagId, 10) },
      { order: parseInt(order, 10) }
    );
    if (conversionTunnelTag) res.sendStatus(204);
    else res.sendStatus(404);
  } catch (err) {
    next(err);
  }
}

controller.createUntrackPath = async function(req, res, next) {
  const { url } = req.body;
  try {
    const untrackPath = await untrackPathService.create({
      url,
      siteId: parseInt(req.params.id, 10),
      createdBy: parseInt(req.user.id, 10)
    });
    res.status(201).json(untrackPath);
  } catch (err) {
    next(err);
  }
}
controller.updateUntrackPath = async function(req, res, next) {
  const { untrackPathId, id } = req.params;
  const { url } = req.body;
  try {
    const [result] = await untrackPathService.update({ id: parseInt(untrackPathId, 10),
      siteId: parseInt(id, 10) }, { url });
    if (result) res.json(result);
    else res.sendStatus(404);
  } catch (err) {
    next(err);
  }
}
controller.deleteUntrackPath = async function(req, res, next) {
  const { untrackPathId, id } = req.params;
  try {
    const result = await untrackPathService.delete({ id: parseInt(untrackPathId, 10),
      siteId: parseInt(id, 10)
    });
    if (result) res.json(result);
    else res.sendStatus(404);
  } catch (err) {
    next(err);
  }
}
controller.getUntrackPaths = async function(req, res, next) {
  const { page, order, ...filters } = req.query;
  try {
    if (page !== undefined && page < 1) {
      res.json("Page can't be lower than 1").status(400);
      return;
    }
    filters.siteId = parseInt(req.params.id, 10);
    const untrackPaths = await untrackPathService.findAll(filters, {
      order,
      limit: page ? 10 : undefined,
      offset: page ? (page - 1) * 10 : undefined
    });
    res.json(untrackPaths);
  } catch (err) {
    next(err);
  }
}
controller.getOneUntrackPath = async function(req, res, next) {
  const { untrackPathId, id } = req.params;
  try {
    const untrackPath = await untrackPathService.findOne({ id: parseInt(untrackPathId, 10),
      siteId: parseInt(id, 10)
    });
    if (untrackPath) res.json(untrackPath);
    else res.sendStatus(404);
  } catch (err) {
    next(err);
  }
}

module.exports = controller;