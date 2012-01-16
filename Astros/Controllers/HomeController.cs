using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Astros.Models;

namespace GroceryList.Controllers
{
    public class HomeController : Controller
    {
        public astrosEntities ge = new astrosEntities();

        public ActionResult Index()
        {
            return View();
        }

        [AcceptVerbs(HttpVerbs.Get)]
        public JsonResult GetParkFactors(string q)
        {
            var items = (from i in ge.park_factor
                          join p in ge.parks on i.site_id equals p.site_id
                          where i.event_code == q
                          orderby i.factor descending, i.site_id
                          select new
                          {
                              retro_id = i.site_id
                            ,
                              name = p.name
                            ,
                              ev = i.event_code
                            ,
                              factor = i.factor

                          }).ToList();

            return Json(items, JsonRequestBehavior.AllowGet);
        }

        [AcceptVerbs(HttpVerbs.Get)]
        public JsonResult GetPlayerSplits(string q)
        {
            var items = (from r in ge.rosters
                         join pl in ge.player_stats on r.retro_id equals pl.retro_id
                         join pr in ge.player_stats on r.retro_id equals pr.retro_id
                         join ps in ge.player_splits on r.retro_id equals ps.retro_id
                         where pl.vs_pitcher_side == "L" && pr.vs_pitcher_side == "R"
                         orderby ps.split descending
                         select new
                         {
                             id = r.retro_id
                           , name = r.last_name + ", " + r.first_name
                           , vsl = pl.ops
                           , vsr = pr.ops
                           , split = ps.split
                           , formula = ps.formula
                         }).ToList();

            return Json(items, JsonRequestBehavior.AllowGet);
        }

        [AcceptVerbs(HttpVerbs.Get)]
        public JsonResult GetLeagueFactors(string q)
        {
            var items = (from i in ge.league_adjustment
                         where i.event_code == q
                         orderby i.season, i.league
                         select new
                         {
                             name = i.league
                           ,
                             ev = i.event_code
                           ,
                             factor = i.factor
                           ,
                             season = i.season

                         }).ToList();

            return Json(items, JsonRequestBehavior.AllowGet);
        }

        [AcceptVerbs(HttpVerbs.Get)]
        public JsonResult GetDemoSuccess(string q, string t)
        {
            if (t == "B")
            {
                var items = (from r in ge.rosters
                             join p in ge.player_stats on r.retro_id equals p.retro_id
                             join l in ge.rosters_lahman on r.retro_id equals l.retro_id
                             where r.retro_id == q
                             orderby p.vs_pitcher_side
                             select new
                             {
                                 name = r.last_name + ", " + r.first_name
                                , side = p.vs_pitcher_side
                                , bday = l.birth_date
                               ,
                                 id = r.retro_id
                               ,
                                 pa = p.pa
                               ,
                                 hr = p.homeruns
                               ,
                                 t = p.triples
                               ,
                                 d = p.doubles
                               ,
                                 s = p.singles
                               ,
                                 w = p.walks
                               ,
                                 hp = p.hitbypitch
                               ,
                                 k = p.strikeouts
                               ,
                                 ops = p.ops
                               ,
                                 ba = p.batting_average
                               ,
                                 obp = p.on_base_percentage
                               ,
                                 nk = p.nonk
                             }).ToList();

                var itemsfinal = new List<object>();
                foreach (var i in items)
                {
                    itemsfinal.Add(new
                    {
                       name = i.name
                       , bday = CalculateAge((DateTime)i.bday.Value)
                       , side = i.side
                       , id = i.id
                       , pa = i.pa
                       , hr = i.hr
                       , t = i.t
                       , d = i.d
                       , s = i.s
                       , w = i.w
                       , hp = i.hp
                       , k =  i.k
                       , ops = i.ops
                       , ba = i.ba
                       , obp = i.obp
                       , nk = i.nk
                    });
                }

                return Json(itemsfinal, JsonRequestBehavior.AllowGet);
            }
            else
            {
                var items2 = (from r in ge.rosters
                             join p in ge.player_stats on r.retro_id equals p.retro_id
                             join l in ge.rosters_lahman on r.retro_id equals l.retro_id
                             where r.retro_id == q && p.vs_pitcher_side == t
                             orderby p.vs_pitcher_side
                             select new
                             {
                                 name = r.last_name + ", " + r.first_name
                               , side = p.vs_pitcher_side
                               ,  bday = l.birth_date
                               ,
                                 id = r.retro_id
                               ,
                                 pa = p.pa
                               ,
                                 hr = p.homeruns
                               ,
                                 t = p.triples
                               ,
                                 d = p.doubles
                               ,
                                 s = p.singles
                               ,
                                 w = p.walks
                               ,
                                 hp = p.hitbypitch
                               ,
                                 k = p.strikeouts
                               ,
                                 ops = p.ops
                               ,
                                 ba = p.batting_average
                               ,
                                 obp = p.on_base_percentage
                               ,
                                 nk = p.nonk
                             }).ToList();

                var itemsfinal2 = new List<object>();
                foreach (var i in items2)
                {
                    itemsfinal2.Add(new
                    {
                        name = i.name
                       ,
                        bday = CalculateAge((DateTime)i.bday.Value)
                        , side = i.side
                       ,
                        id = i.id
                       ,
                        pa = i.pa
                       ,
                        hr = i.hr
                       ,
                        t = i.t
                       ,
                        d = i.d
                       ,
                        s = i.s
                       ,
                        w = i.w
                       ,
                        hp = i.hp
                       ,
                        k = i.k
                       ,
                        ops = i.ops
                       ,
                        ba = i.ba
                       ,
                        obp = i.obp
                       ,
                        nk = i.nk
                    });
                }

                return Json(itemsfinal2, JsonRequestBehavior.AllowGet);
            }
        }

        public int CalculateAge(DateTime birthdate)
        {
            // get the difference in years
            int years = 2010 - birthdate.Year;
            // subtract another year if we're before the
            // birth day in the current year
            if (7 < birthdate.Month || (7 == birthdate.Month && 1 < birthdate.Day))
                years--;

            return years;
        }

    }
}
